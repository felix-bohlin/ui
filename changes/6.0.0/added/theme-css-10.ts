import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds safe-area tokens, `--ui-safe-area-inset-block-start`, `--ui-safe-area-inset-block-end`, `--ui-safe-area-inset-inline-start` and `--ui-safe-area-inset-inline-end`: the parts of the screen a notch, a rounded corner or a home indicator covers, from `env(safe-area-inset-*)` with the inline sides swapped on a right-to-left page, and `0px` unless the viewport meta tag has `viewport-fit=cover`. Each side of a `Drawer` that touches the screen edge pads its content by them, and a `Toaster` measures its insets from them, so a sheet's last row and a toast stay above the home indicator.",
} satisfies Change
