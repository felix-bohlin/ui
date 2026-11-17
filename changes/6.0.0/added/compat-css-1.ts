import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`compat.css` and the `components.compat` layer, after `components.extended`, hold the browser fallbacks that take more than the browser default, one file per component in `css/compat/`. Each one sits in `@supports`, so it only applies where a browser needs it. `imports.css`, `dist/opui.css` and `dist/opui.components.css` include them. `dist/opui.no-compat.css` leaves them out, and `dist/opui.baseline-<year>.css`, one per Baseline year from 2023, keeps only the ones for features that became Baseline after that year, plus the browser bug fixes, such as the iOS `Menu` submenu anchor. In browsers without `overflow-inline` and `overflow-block` (Chrome before 135, Safari before 26), `Carousel`, `ControlGroup`, `Dialog`, `Drawer`, `Menu`, `Table`, `Tabs`, `ToggleGroup` and rich text scroll through `overflow-x` and `overflow-y` instead, from their files in `css/compat/`.",
} satisfies Change
