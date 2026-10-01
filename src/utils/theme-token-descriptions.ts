export const themeTokenDescriptions: Record<string, string> = {
  "--backdrop-blur": "Blur radius behind an open `Dialog` or `Drawer`.",
  "--backdrop-color": "Overlay color behind an open `Dialog` or `Drawer`.",
  "--blue":
    "A literal blue derived from the palette lightness. No severity meaning.",
  "--border-color":
    "Default border color for cards, lists, tables and dividers.",
  "--border-radius":
    "Default corner radius for cards, callouts, tables and accordions.",
  "--border-width": "Default border width for components that draw a border.",
  "--button-border-radius":
    "Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`.",
  "--button-size": "Default `Button` height.",
  "--button-size-large": "`Button` height with `.ui-large`.",
  "--button-size-small": "`Button` height with `.ui-small`.",
  "--button-size-x-small":
    "`Button` and `IconButton` height with `.ui-x-small`.",
  "--choice-size": "Default `Checkbox` and `Radio` input size.",
  "--choice-size-large": "`Checkbox` and `Radio` input size with `.ui-large`.",
  "--choice-size-small":
    "`Checkbox` and `Radio` input size with `.ui-small` and inside `List`.",
  "--control-size":
    "Shared default height for fields and buttons so they line up.",
  "--control-size-large": "Shared large height for fields and buttons.",
  "--control-size-small": "Shared small height for fields and buttons.",
  "--control-size-x-small": "Shared x-small height for fields and buttons.",
  "--critical": "Severity color for errors and destructive actions.",
  "--density":
    "Multiplier for the `--control-size*` scale, rounded to whole pixels. `0.875` is compact, `1.125` is comfortable.",
  "--disabled-opacity": "Opacity applied to disabled controls.",
  "--duration": "Default transition duration. Multiplied by `--motion`.",
  "--duration-fast": "Transition duration for hover and press feedback.",
  "--duration-slow":
    "Transition duration for entering and leaving overlays and toasts.",
  "--ease": "Default easing for transitions.",
  "--ease-enter": "Easing for elements entering the screen.",
  "--ease-exit": "Easing for elements leaving the screen.",
  "--field-border-color":
    "Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.",
  "--field-border-radius": "Corner radius for fields.",
  "--field-border-width":
    "Border width for fields, `Checkbox`, `Radio` and `Switch`.",
  "--field-helper-color": "Text color for helper and end text under a field.",
  "--field-helper-font-size":
    "Font size for helper and end text under a field.",
  "--field-helper-line-height":
    "Line height for helper and end text under a field.",
  "--field-label-color": "Text color for field labels.",
  "--field-label-font-size": "Font size for field labels.",
  "--field-label-font-weight":
    "Font weight for emphasized field labels and legends.",
  "--field-required-color": "Color of the required asterisk.",
  "--field-size": "Default field height.",
  "--field-size-large": "Field height with `.ui-large`.",
  "--field-size-small": "Field height with `.ui-small`.",
  "--field-size-x-small": "Field height with `.ui-x-small`.",
  "--focus-ring-color":
    "Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.",
  "--focus-ring-inset":
    "Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.",
  "--focus-ring-offset": "Distance between a control and its focus ring.",
  "--focus-ring-style": "Outline style of the focus ring.",
  "--focus-ring-width": "Width of the focus ring.",
  "--font-size-05":
    "A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.",
  "--font-size-h1": "Font size for `h1` and `.ui-h1`.",
  "--font-size-h2": "Font size for `h2` and `.ui-h2`.",
  "--font-size-h3": "Font size for `h3` and `.ui-h3`.",
  "--font-size-h4": "Font size for `h4` and `.ui-h4`.",
  "--font-size-h5": "Font size for `h5` and `.ui-h5`.",
  "--font-size-h6": "Font size for `h6` and `.ui-h6`.",
  "--font-weight-bold": "Font weight for headings, buttons and terms.",
  "--font-weight-medium": "Font weight for badges, overlines and group labels.",
  "--font-weight-semibold": "Font weight for labels, table headers and titles.",
  "--gray-chroma": "Chroma of the gray ramp. Raise it for tinted grays.",
  "--gray-hue": "Hue of the gray ramp.",
  "--green":
    "A literal green derived from the palette lightness. No severity meaning.",
  "--icon-size": "Default icon size inside components.",
  "--icon-size-large": "Icon size inside `IconButton`, `Avatar` and `List`.",
  "--icon-size-small": "Icon size inside `Chip`.",
  "--info": "Severity color for informational messages.",
  "--invalid-color": "Color for invalid fields and validation messages.",
  "--motion":
    "Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`.",
  "--neutral": "Severity color for neutral messages.",
  "--orange":
    "A literal orange derived from the palette lightness. No severity meaning.",
  "--palette-chroma":
    "Chroma of the palette source color, as a multiplier of `0.21`.",
  "--palette-hue":
    "Hue of the palette source color in degrees. Green in light mode and blue in dark mode by default.",
  "--palette-hue-rotate-by":
    "Degrees of hue drift per palette step, for warm or cool ramps.",
  "--palette-source":
    "The source color the palette is derived from. Set it to one `oklch()` color to replace `--palette-hue` and `--palette-chroma`.",
  "--primary": "Brand color for primary actions and accents.",
  "--primary-contrast": "Text color on a `--primary` background.",
  "--primary-dark": "A darker `--primary`.",
  "--primary-light": "A lighter `--primary`.",
  "--red":
    "A literal red derived from the palette lightness. No severity meaning.",
  "--rhythm-step":
    "Vertical rhythm unit. Rich text margins and heading line heights round to it.",
  "--state-active-alpha":
    "Alpha of the pressed state layer on neutral buttons in light mode.",
  "--state-active-alpha-accent":
    "Alpha of the pressed state layer on primary and critical buttons.",
  "--state-active-alpha-dark":
    "Alpha of the pressed state layer on neutral buttons in dark mode.",
  "--state-hover-alpha":
    "Alpha of the hover state layer on neutral buttons in light mode.",
  "--state-hover-alpha-accent":
    "Alpha of the hover state layer on primary and critical buttons.",
  "--state-hover-alpha-dark":
    "Alpha of the hover state layer on neutral buttons in dark mode.",
  "--success": "Severity color for success messages.",
  "--surface-default": "Page and card background.",
  "--surface-elevated": "Background of elevated cards and accordions.",
  "--surface-filled":
    "Background of filled areas such as progress tracks and table stripes.",
  "--surface-inverse":
    "Background of `Toast` and `Tooltip`, inverted against the page.",
  "--surface-tonal": "Background of tonal variants.",
  "--switch-dot-size": "Diameter of the `Switch` dot.",
  "--switch-dot-size-small":
    "Diameter of the `Switch` dot with `.ui-small` and inside `List`.",
  "--switch-track-height": "Height of the `Switch` track.",
  "--switch-track-height-small":
    "Height of the `Switch` track with `.ui-small` and inside `List`.",
  "--switch-track-width": "Width of the `Switch` track.",
  "--switch-track-width-small":
    "Width of the `Switch` track with `.ui-small` and inside `List`.",
  "--text-disabled": "Text color of disabled buttons and chips.",
  "--text-inverse": "Text color on `--surface-inverse`.",
  "--text-muted": "Body text color.",
  "--text-muted-contrast": "Muted text color on an inverted surface.",
  "--text-primary": "Emphasized text color for headings, labels and values.",
  "--text-primary-contrast": "Emphasized text color on an inverted surface.",
  "--warning": "Severity color for warnings.",
}
