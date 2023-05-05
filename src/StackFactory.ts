import { TerraformOutput } from "cdktf";

import type { CdktfStackComponent } from "./StackComponent";
import type { CdktfStackConstructor } from "./types";
import type { Construct } from "constructs";

export function createComponent<S extends CdktfStackComponent, P>(
  scope: Construct,
  Stack: CdktfStackConstructor<S>,
  props?: P & { stackName: string }
) {
  const stack = new Stack(scope, props?.stackName ?? Stack.name, props);

  stack.beforeCreateResources?.();

  stack.createResources();

  stack.afterCreateResources?.();

  const outputs = stack.outputs;
  if (outputs.size > 0) {
    outputs.forEach((config, id) => {
      new TerraformOutput(stack, id, config);
    });
  }

  return stack as unknown as S;
}

export async function createComponentAsync<S extends CdktfStackComponent, P>(
  scope: Construct,
  Stack: CdktfStackConstructor<S>,
  props?: P & { stackName: string }
) {
  const stack = new Stack(scope, props?.stackName ?? Stack.name, props);

  await stack.beforeCreateResources?.();

  await stack.createResources();

  await stack.afterCreateResources?.();

  const outputs = stack.outputs;
  if (outputs.size > 0) {
    outputs.forEach((config, id) => {
      new TerraformOutput(stack, id, config);
    });
  }

  return stack as unknown as S;
}
