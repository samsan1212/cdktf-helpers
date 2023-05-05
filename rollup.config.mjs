import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";
import dts from "rollup-plugin-dts";

import packageJson from "./package.json" assert { type: "json" };
import tsconfigJson from "./tsconfig.json" assert { type: "json" };

const base = {
  plugins: [
    alias({
      entries: [{ find: "~", replacement: "src" }],
    }),
    commonjs({ requireReturnsDefault: "auto" }),
    nodeResolve({ preferBuiltins: true, exportConditions: ["node"] }),
    json(),
    swc({
      swc: {
        jsc: {
          target: "es2019",
          parser: {
            syntax: "typescript",
            decorators: true,
            topLevelAwait: true,
            importMeta: true,
          },
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
      },
    }),
  ],
  external: [
    ...Object.keys(packageJson.devDependencies ?? {}),
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ],
};

const input = "src/mod.ts";

export default [
  {
    ...base,
    input,
    output: {
      sourcemap: true,
      file: "lib/index.js",
      format: "commonjs",
    },
  },
  {
    ...base,
    input,
    output: {
      sourcemap: true,
      file: "lib/mod.js",
      format: "es",
    },
  },
  {
    ...base,
    input,
    output: { file: "lib/mod.d.ts", format: "es" },
    plugins: [
      dts({
        compilerOptions: {
          baseUrl: tsconfigJson.compilerOptions.baseUrl,
          paths: tsconfigJson.compilerOptions.paths,
        },
      }),
    ],
  },
];
