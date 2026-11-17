import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea` and `Select` take `x-small` (`.ui-x-small`, 28px) and `large` (`.ui-large`, 48px) sizes, so every field size has a matching `Button` size. x-small fields set their text in `--ui-font-size-caption`, like x-small buttons, and keep at least 16px on iPhone and iPad. Their block padding follows `--ui-space-scale`, like the other sizes.",
  notes: {
    select: {
      default: `<a href="#sizes">x-small and large</a> sizes with the <code>size</code> prop.`,
      html: `<a href="#sizes">x-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
    "text-field": {
      default: `<a href="#sizes">x-small and large</a> sizes with the <code>size</code> prop.`,
      html: `<a href="#sizes">x-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
    textarea: {
      default: `<a href="#sizes">x-small and large</a> sizes with the <code>size</code> prop.`,
      html: `<a href="#sizes">x-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
  },
} satisfies Change
