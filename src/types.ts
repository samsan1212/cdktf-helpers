/* eslint-disable @typescript-eslint/no-empty-function */
import type { CdktfStackComponent } from "./StackComponent";
import type { TerraformOutputConfig } from "cdktf";
import type { Construct } from "constructs";

export type CdktfStackConstructor<T extends CdktfStackComponent> = {
  new (scope: Construct, id: string, props?: any): T;
};

export interface ICdktfStackComponent<P = any, S = any> {
  props: P;
  state: S;
  outputs: Map<string, TerraformOutputConfig>;
  setState(key: keyof S, value: S[keyof S]): void;
  setOutput(id: string, config: TerraformOutputConfig): void;
  beforeCreateResources?: () => void | Promise<void>;
  createResources(): void | Promise<void>;
  afterCreateResources?: () => void | Promise<void>;
}
