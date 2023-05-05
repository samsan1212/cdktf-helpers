# CDKTF Helpers

Helpers for creating the stacks of `cdktf`, inspired by [the class component of `React.js`](https://react.dev/reference/react/Component#constructor).

- [CDKTF Helpers](#cdktf-helpers)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Component](#component)
    - [Component API](#component-api)
      - [`constructor()`](#constructor)
      - [`beforeCreateResources()`](#beforecreateresources)
      - [`createResources()`](#createresources)
      - [`afterCreateResources()`](#aftercreateresources)
  - [Component Factory](#component-factory)
    - [`CdktfComponentFactory.createComponent`](#cdktfcomponentfactorycreatecomponent)
    - [`CdktfComponentFactory.createComponentAsync`](#cdktfcomponentfactorycreatecomponentasync)
    - [Component lifecycle](#component-lifecycle)

## Installation

```bash
npm i cdktf-helpers
```

## Quick Start

```typescript
// main_stack.ts
export class MainStack extends CdktfStackComponent<Props, State> {
  beforeCreateResources() {
    // do something before creating resources
    new AwsProvider(this, "AWS", {
      region: "us-west-1",
    });

    const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
    // set value for later use
    this.setState("instaceType", config.instanceType);
  }

  createResources() {
    // you can get value from props
    const ami = this.props.ami;
    const ec2Instance = new Instance(this, "compute", {
      ami,
      instanceType: this.state.instanceType,
    });

    // set value for output
    this.setOutput("ec2_instance", ec2Instance);
  }
}

// main.ts
const app = new App();

CdktfComponentFactory.createComponent(app, MainStack.name, {
  ami: "ami-01456a894f71116f2",
});
```

## Component

A `CdktfStackComponent` comes with a pair of `props` and `state` to help you manage the data flow of your CDKTF stack.

To define a CDKTF component class, you need to extend `CdktfStackComponent`:

```typescript
import { CdktfStackComponent } from "cdktf-helpers";

type Props = { ami: string };
type State = { ec2Instance: Instance };

export class MainStack extends CdktfStackComponent<Props, State> {
  beforeCreateResources() {
    // do something before creating resources
  }

  createResources() {
    // create resources here
  }

  afterCreateResources() {
    // do something after creating resources
  }
}
```

### Component API

#### `constructor()`

```typescript
type constructor = (
  scope: Construct,
  id: string,
  props?: Record<string, any> & { stackName: string }
) => CdktfStackComponent;
```

#### `beforeCreateResources()`

It is invoked immediately after a component is initialised.

#### `createResources()`

It is invoked after `beforeCreateResources` is executed.

You can create the resources in this method.

#### `afterCreateResources()`

It is invoked after `createResource` is executed.

## Component Factory

### `CdktfComponentFactory.createComponent`

```typescript
import { CdktfComponentFactory } from "cdktf-helpers";
import { App } from "cdktf";
import MainStack from "./main_stack.ts";

const app = new App();

CdktfComponentFactory.createComponent(app, MainStack.name, {
  ami: "ami-01456a894f71116f2",
});
```

### `CdktfComponentFactory.createComponentAsync`

Factory also provide async method, you can use it to create component asynchronously.

```typescript
// With top level await
import { CdktfComponentFactory } from "cdktf-helpers";
import { App } from "cdktf";
import MainStack from "./main_stack.ts";

const app = new App();

await CdktfComponentFactory.createComponentAsync(app, MainStack.name, {
  ami: "ami-01456a894f71116f2",
});
```

### Component lifecycle

When an instance of the CDKTF component is generated by `createComponent()`, these methods are called in the below order:

- `constructor()`
- `beforeCreateResources()`
- `createResource()`
- `afterCreateResources()`
- Create Terraform outputs if any
  - If you have triggered `setOutput` while creating resources, it will be called after all functions are executed.
