import DefaultTheme from "./theme-default/without-fonts"
import type { Theme } from "vitepress"

import "../../../src/themes/theme-two/imports.css"
import "../../../node_modules/opui-blocks/dist/ui-blocks.css"
import "../custom.css"

export default {
  extends: DefaultTheme,
} satisfies Theme
