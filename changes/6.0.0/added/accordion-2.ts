import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Accordion`, `Avatar`, `Button`, `Card`, `Checkbox`, `Chip`, `ControlGroup`, `Divider`, `List`, `Progress`, `Radio`, `Range`, `Select`, `Switch`, `Tabs`, `TextField`, `Textarea`, `ToggleButton` and `ToggleGroup` accept their default by name, which adds no class: `size="medium"` on every sized component, `variant="plain"` on `Accordion` and `Card`, `"transparent"` on `Button` and `ControlGroup`, `"outlined"` on `Divider` and `Range`, `"filled"` on `List`, and `"tonal"` on `Progress` and `Tabs`. In HTML, a `Drawer` opens from the inline start without `.ui-inline-start`.',
  notes: {
    accordion: {
      react: `<a href="#variants">Variants</a> name the default: <code>variant="plain"</code>.`,
      svelte: `<a href="#variants">Variants</a> name the default: <code>variant="plain"</code>.`,
    },
    avatar: components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    button: components(
      `<a href="#sizes">Sizes</a> and <a href="#variants">variants</a> name their defaults: <code>size="medium"</code> and <code>variant="transparent"</code>.`,
    ),
    card: components(
      `<a href="#variants">Variants</a> name the default: <code>variant="plain"</code>.`,
    ),
    checkbox: components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    chip: {
      default: `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
      html: `The default <a href="#variants">tonal</a> chip needs no <code>.ui-tonal</code>.`,
    },
    "control-group": components(
      `<a href="#sizes">Sizes</a> and <a href="#variants">variants</a> name their defaults: <code>size="medium"</code> and <code>variant="transparent"</code>.`,
    ),
    radio: components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    select: components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    switch: components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    "text-field": components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    textarea: components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    toggle: components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
  },
} satisfies Change
