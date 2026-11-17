import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`types.d.vue.ts` in every component folder is `types.vue-props.ts`, since TypeScript reads a `*.d.vue.ts` file as a declaration file and `skipLibCheck` skipped it. Update deep imports from `opui-css/components/<Name>/types.d.vue` to `types.vue-props`, or import the types from `opui-css/vue`.",
} satisfies Change
