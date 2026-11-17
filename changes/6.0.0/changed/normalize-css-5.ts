import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`normalize.css` fills an `svg` without a `fill` attribute with `currentColor` instead of black, so icons from sets that leave `fill` out, such as Material Symbols and Fluent UI System Icons, take the text color. It applies to every `svg` on the page, charts and logos included, wherever their shapes rely on the default black. Shapes inside a `mask` keep the default black, which a mask reads as hidden.",
} satisfies Change
