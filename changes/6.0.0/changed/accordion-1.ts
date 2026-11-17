import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion`, `Button`, `Callout`, `Card`, `Chip`, `ControlGroup`, `DescriptionList`, `Divider`, `List`, `Table`, `ToggleButton`, `ToggleGroup` and `Typography` borders read `--ui-border-width`, and `Checkbox`, `Radio`, `Switch` and `TextField` borders read `--ui-field-border-width`, instead of a hardcoded `1px` or Open Props `--border-size-1`.",
  notes: {
    accordion: `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    button: `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of <code>--border-size-1</code>.`,
    callout: `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    card: `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    chip: `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    "control-group": `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    "description-list": `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    divider: `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of <code>--border-size-1</code>.`,
    list: `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    table: `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    toggle: `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    typography: `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of <code>--border-size-1</code>.`,
  },
} satisfies Change
