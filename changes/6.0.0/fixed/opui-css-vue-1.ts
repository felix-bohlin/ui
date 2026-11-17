import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`opui-css/vue` renders no `class` or `style` attribute on an element whose class list or style comes out empty, instead of `class=""` or `style=""`.',
} satisfies Change
