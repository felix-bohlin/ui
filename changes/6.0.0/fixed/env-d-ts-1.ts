import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`env.d.ts` is in the package `exports`, so `/// <reference types="opui-css/env.d.ts" />` resolves.',
} satisfies Change
