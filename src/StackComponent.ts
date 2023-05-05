import { TerraformStack } from "cdktf";

import type { ICdktfStackComponent } from "./types";
import type { TerraformOutputConfig } from "cdktf";
import type { Construct } from "constructs";

export abstract class CdktfStackComponent<Props = Record<string, any>, State = Record<string, any>>
  extends TerraformStack
  implements ICdktfStackComponent<Props, State>
{
  readonly #props: Map<keyof Props, Props[keyof Props]>;
  readonly #state = new Map<keyof State, State[keyof State]>();
  readonly #outputs = new Map<string, TerraformOutputConfig>();

  constructor(scope: Construct, id: string, props?: Props) {
    super(scope, id);
    this.#props = new Map(Object.entries(props ?? {}) as [keyof Props, Props[keyof Props]][]);
  }

  get props(): Props {
    return Object.fromEntries(this.#props.entries()) as Props;
  }

  get state(): State {
    return Object.fromEntries(this.#state.entries()) as State;
  }

  get outputs(): Map<string, TerraformOutputConfig> {
    return this.#outputs;
  }

  setState<K extends keyof State>(key: K, value: State[K]): void {
    this.#state.set(key, value);
  }

  setOutput(id: string, config: TerraformOutputConfig): void {
    this.#outputs.set(id, config);
  }

  abstract createResources(): void | Promise<void>;
}
