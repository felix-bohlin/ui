import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField` file inputs are `--ui-field-size` high. They were 2px taller. Their button shrinks the gap around it instead of cutting off its text when a theme's text is too large for the field.",
} satisfies Change
