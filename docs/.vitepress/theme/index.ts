import DefaultTheme from "./theme-default/without-fonts"
import type { Theme } from "vitepress"

import "../../../node_modules/opui-css/dist/op+ui.css"
import "../custom.css"

export default {
  extends: DefaultTheme,
} satisfies Theme
