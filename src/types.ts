/* eslint-disable @typescript-eslint/no-empty-function */
import type { CdktfStackComponent } from "./StackComponent";
import type { Construct } from "constructs";

export type CdktfStackConstructor<T extends CdktfStackComponent> = {
  new (scope: Construct, id: string, props?: any): T;
};

export interface ICdktfStackComponent {
  beforeCreateResources?: () => void | Promise<void>;
  createResources(): void | Promise<void>;
  afterCreateResources?: () => void | Promise<void>;
}
