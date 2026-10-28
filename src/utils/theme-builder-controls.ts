import { exampleTheme } from "./example-themes"
import {
  BRAND_TOKENS,
  COMPONENT_RADII,
  CORNER_TOKENS,
  FOLLOW_RADIUS,
  type Theme,
  type ThemeTokens,
} from "./theme"
import { BALANCED_PRIMARY, MONOCHROME_PRIMARY } from "./theme-brand"
import { WEB_FONTS, fontStack } from "./theme-fonts"

export type ChoiceOption = {
  group?: string
  label: string
  tokens: ThemeTokens
  value: string
}

type Base = { hint?: string; id: string; label: string; tier: "basic" | "fine" }

export type BrandControl = Base & { kind: "brand" }

export type CornersControl = Base & { kind: "corners" }

export type ColorControl = Base & {
  follow?: string[]
  kind: "color"
  token: string
}

export type ChoiceControl = Base & {
  display: "select" | "toggle"
  dynamic?: "brand-hue" | "primary-tone"
  font?: boolean
  kind: "choice"
  options: ChoiceOption[]
}

export type RangeControl = Base & {
  display: "number" | "percent" | "unit"
  fallback?: string
  follows?: string
  kind: "range"
  max: number
  min: number
  scale?: "density"
  step: number
  token: string
  unit: "" | "px" | "rem"
}

export type Control =
  BrandControl | ChoiceControl | ColorControl | CornersControl | RangeControl

export type ControlGroup = {
  controls: Control[]
  description: string
  id: string
  label: string
}

const REVERT = "revert-layer"

const revert = (...tokens: string[]) =>
  Object.fromEntries(tokens.map((token) => [token, REVERT]))

export { BALANCED_PRIMARY, COMPONENT_RADII, FOLLOW_RADIUS, MONOCHROME_PRIMARY }

const SYSTEM_FONTS = [
  {
    group: "System",
    label: "Native (Bootstrap)",
    value:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif',
  },
  {
    group: "System",
    label: "Serif",
    value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  },
  { group: "System", label: "System", value: "system-ui, sans-serif" },
]

const GROUP_LABELS = { mono: "Mono", sans: "Sans serif", serif: "Serif" }

export const FONTS = [
  ...SYSTEM_FONTS,
  ...WEB_FONTS.filter((font) => font.category !== "mono").map((font) => ({
    group: GROUP_LABELS[font.category],
    label: font.family,
    load: font.family,
    value: fontStack(font),
  })),
].toSorted(
  (a, b) => a.group.localeCompare(b.group) || a.label.localeCompare(b.label),
)

export const CODE_FONTS = [
  {
    group: "System",
    label: "System mono",
    value: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  },
  ...WEB_FONTS.filter((font) => font.category === "mono").map((font) => ({
    group: "Mono",
    label: font.family,
    load: font.family,
    value: fontStack(font),
  })),
]

const fontOptions = (token: string, fonts = FONTS) =>
  fonts.map((font) => ({
    group: font.group,
    label: font.label,
    tokens: { [token]: font.value },
    value: font.label,
  }))

const SHADOW_TOKENS = [
  "--ui-button-hover-shadow",
  "--ui-button-hover-translate",
  "--ui-shadow-control",
  "--ui-shadow-elevated",
  "--ui-shadow-field",
  "--ui-shadow-overlay",
  "--ui-shadow-scroll",
  "--ui-shadow-selected",
  "--ui-shadow-surface",
]

const shadows = (tokens: ThemeTokens) => ({
  ...revert(...SHADOW_TOKENS),
  ...tokens,
})

const MATERIAL_SHADOW =
  "0 1px 2px 0 oklch(0 0 0 / 0.3), 0 1px 3px 1px oklch(0 0 0 / 0.15)"

const MATERIAL_SHADOW_HIGH =
  "0 1px 2px 0 oklch(0 0 0 / 0.3), 0 2px 6px 2px oklch(0 0 0 / 0.15)"

const SOFT_SHADOW =
  "0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1)"

const SUBTLE_SHADOW = "0 0.125rem 0.25rem oklch(0 0 0 / 0.075)"

const HEADING_SIZE_TOKENS = [1, 2, 3, 4, 5, 6].map(
  (level) => `--ui-font-size-h${level}`,
)

const headingSizes = (sizes: string[]) =>
  Object.fromEntries(
    HEADING_SIZE_TOKENS.map((token, index) => [token, sizes[index]]),
  )

const STATE_TOKENS = [
  "--ui-state-active-alpha-accent",
  "--ui-state-active-alpha-dark",
  "--ui-state-active-alpha-light",
  "--ui-state-hover-alpha-accent",
  "--ui-state-hover-alpha-dark",
  "--ui-state-hover-alpha-light",
]

const states = (values: number[]) =>
  Object.fromEntries(
    STATE_TOKENS.map((token, index) => [token, `${values[index]}%`]),
  )

const BUTTON_PADDING_TOKENS = [
  "--ui-button-padding-inline",
  "--ui-button-padding-inline-large",
  "--ui-button-padding-inline-small",
  "--ui-button-padding-inline-x-small",
]

const buttonPadding = (values: string[]) =>
  Object.fromEntries(
    BUTTON_PADDING_TOKENS.map((token, index) => [token, values[index]]),
  )

const SWITCH_TOKENS = [
  "--ui-switch-thumb-size",
  "--ui-switch-track-block-size",
  "--ui-switch-track-inline-size",
]

const weights = (token: string, values: number[]) =>
  values.map((weight) => ({
    label: WEIGHT_LABELS[weight],
    tokens: { [token]: `${weight}` },
    value: `${weight}`,
  }))

const WEIGHT_LABELS: Record<number, string> = {
  400: "Regular",
  500: "Medium",
  600: "Semibold",
  700: "Bold",
  800: "Extra bold",
}

const color = (
  id: string,
  label: string,
  token: string,
  tier: Base["tier"],
  extra: Partial<ColorControl> = {},
): ColorControl => ({ id, kind: "color", label, tier, token, ...extra })

export const UNSET_VALUES: ThemeTokens = {
  "--ui-button-font-weight": "700",
  "--ui-button-hover": "shade",
  "--ui-button-radius": FOLLOW_RADIUS,
}

const ALIASES: ThemeTokens = { "1e5px": "var(--ui-radius-round)" }

export const tidy = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .replace(/\(\s/g, "(")
    .replace(/\s\)/g, ")")
    .replace(/\s*,\s*/g, ", ")
    .trim()

export const GROUPS: ControlGroup[] = [
  {
    controls: [
      {
        hint: "Buttons, links and selected items",
        id: "brand",
        kind: "brand",
        label: "Color",
        tier: "basic",
      },
      {
        display: "select",
        dynamic: "primary-tone",
        hint: "Filled buttons, checked boxes and switches",
        id: "primary-tone",
        kind: "choice",
        label: "Accent color",
        options: [
          { label: "Brand color", tokens: {}, value: "brand" },
          {
            label: "Balanced shade of the brand",
            tokens: { "--ui-primary-source": BALANCED_PRIMARY },
            value: "balanced",
          },
          {
            label: "Black and white",
            tokens: { "--ui-primary-source": MONOCHROME_PRIMARY },
            value: "monochrome",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "Tonal buttons and chips",
        id: "tonal",
        kind: "choice",
        label: "Tonal fill",
        options: [
          {
            label: "Brand tint",
            tokens: revert("--ui-on-primary-tonal", "--ui-primary-tonal"),
            value: "tint",
          },
          {
            label: "Neutral",
            tokens: {
              "--ui-on-primary-tonal": "var(--ui-text-strong)",
              "--ui-primary-tonal": "var(--ui-surface-tonal)",
            },
            value: "neutral",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "Selected list items, menu items and toggle buttons",
        id: "selected",
        kind: "choice",
        label: "Selected items",
        options: [
          {
            label: "Per component",
            tokens: revert("--ui-on-selected", "--ui-selected"),
            value: "default",
          },
          {
            label: "Brand",
            tokens: {
              "--ui-on-selected": "var(--ui-on-primary)",
              "--ui-selected": "var(--ui-primary)",
            },
            value: "brand",
          },
          {
            label: "Subtle",
            tokens: {
              "--ui-on-selected": "var(--ui-text-strong)",
              "--ui-selected": "var(--ui-surface-tonal)",
            },
            value: "subtle",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "Links and text in the brand color",
        id: "primary-text",
        kind: "choice",
        label: "Brand text",
        options: [
          {
            label: "Brand tinted",
            tokens: revert("--ui-primary-text"),
            value: "tinted",
          },
          {
            label: "Same as text",
            tokens: { "--ui-primary-text": "var(--ui-text)" },
            value: "text",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        id: "tabs-accent",
        kind: "choice",
        label: "Tabs indicator",
        options: [
          {
            label: "Text color",
            tokens: revert("--ui-tabs-accent"),
            value: "text",
          },
          {
            label: "Brand",
            tokens: { "--ui-tabs-accent": "var(--ui-primary-text)" },
            value: "brand",
          },
        ],
        tier: "fine",
      },
    ],
    description:
      "A starting point, a mood and the color your theme is built around. The palette, buttons and links follow it.",
    id: "brand",
    label: "Start",
  },
  {
    controls: [
      {
        display: "select",
        dynamic: "brand-hue",
        hint: "The tint in backgrounds, borders and text",
        id: "gray-tint",
        kind: "choice",
        label: "Gray tint",
        options: [
          { label: "Brand hue", tokens: {}, value: "brand" },
          {
            label: "Blue",
            tokens: { "--ui-gray-chroma": "0.03", "--ui-gray-hue": "260" },
            value: "blue",
          },
          {
            label: "Cool",
            tokens: { "--ui-gray-chroma": "0.01", "--ui-gray-hue": "255" },
            value: "cool",
          },
          {
            label: "Pure gray",
            tokens: { "--ui-gray-chroma": "0", "--ui-gray-hue": "0" },
            value: "pure",
          },
          {
            label: "Slate",
            tokens: { "--ui-gray-chroma": "0.012", "--ui-gray-hue": "250" },
            value: "slate",
          },
          {
            label: "Violet",
            tokens: { "--ui-gray-chroma": "0.012", "--ui-gray-hue": "300" },
            value: "violet",
          },
          {
            label: "Warm",
            tokens: { "--ui-gray-chroma": "0.012", "--ui-gray-hue": "70" },
            value: "warm",
          },
        ],
        tier: "basic",
      },
      color("surface", "Page background", "--ui-surface", "fine"),
      color(
        "surface-elevated",
        "Raised surface",
        "--ui-surface-elevated",
        "fine",
        { hint: "Cards, menus and dialogs" },
      ),
      color("surface-filled", "Filled surface", "--ui-surface-filled", "fine", {
        hint: "Filled cards and fields",
      }),
      color("surface-tonal", "Tonal surface", "--ui-surface-tonal", "fine", {
        hint: "Tonal buttons, chips and hover fills",
      }),
      {
        display: "toggle",
        hint: "Tooltips and inverse buttons",
        id: "inverse",
        kind: "choice",
        label: "Inverse surface",
        options: [
          {
            label: "Gray",
            tokens: revert("--ui-on-inverse", "--ui-surface-inverse"),
            value: "gray",
          },
          {
            label: "Brand",
            tokens: {
              "--ui-on-inverse": "var(--ui-on-primary)",
              "--ui-surface-inverse": "var(--ui-primary)",
            },
            value: "brand",
          },
        ],
        tier: "fine",
      },
      color("text-strong", "Strong text", "--ui-text-strong", "fine", {
        hint: "Headings and labels",
      }),
      color("text", "Text", "--ui-text", "fine"),
      color("text-subtle", "Subtle text", "--ui-text-subtle", "fine", {
        hint: "Descriptions and helper text",
      }),
      {
        display: "toggle",
        hint: "The empty part of sliders and progress bars",
        id: "track",
        kind: "choice",
        label: "Empty track",
        options: [
          {
            label: "Tonal",
            tokens: revert("--ui-track-bg-color"),
            value: "tonal",
          },
          {
            label: "Field border",
            tokens: { "--ui-track-bg-color": "var(--ui-field-border-color)" },
            value: "border",
          },
          {
            label: "Raised",
            tokens: { "--ui-track-bg-color": "var(--ui-surface-elevated)" },
            value: "raised",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        id: "code-bg",
        kind: "choice",
        label: "Inline code background",
        options: [
          {
            label: "Tinted",
            tokens: revert("--ui-code-bg-color"),
            value: "tinted",
          },
          {
            label: "Tonal",
            tokens: { "--ui-code-bg-color": "var(--ui-surface-tonal)" },
            value: "tonal",
          },
          {
            label: "None",
            tokens: { "--ui-code-bg-color": "transparent" },
            value: "none",
          },
        ],
        tier: "fine",
      },
    ],
    description: "Grays, backgrounds and text colors.",
    id: "neutrals",
    label: "Neutrals and surfaces",
  },
  {
    controls: [
      color("border-color", "Border color", "--ui-border-color", "basic", {
        follow: ["--ui-border-color-on-filled"],
        hint: "Cards, dividers and tables",
      }),
      {
        display: "toggle",
        id: "border-width",
        kind: "choice",
        label: "Border width",
        options: [
          {
            label: "Thin",
            tokens: { "--ui-border-width": "1px" },
            value: "1px",
          },
          {
            label: "Thick",
            tokens: { "--ui-border-width": "2px" },
            value: "2px",
          },
        ],
        tier: "basic",
      },
      color(
        "focus-ring-color",
        "Focus ring color",
        "--ui-focus-ring-color",
        "basic",
        { hint: "The outline around the focused control" },
      ),
      {
        display: "toggle",
        hint: "The edge of cards, menus and dialogs",
        id: "raised-edges",
        kind: "choice",
        label: "Raised edges",
        options: [
          {
            label: "Per component",
            tokens: revert("--ui-border-color-raised"),
            value: "default",
          },
          {
            label: "Borders",
            tokens: { "--ui-border-color-raised": "var(--ui-border-color)" },
            value: "border",
          },
          {
            label: "None",
            tokens: { "--ui-border-color-raised": "transparent" },
            value: "none",
          },
        ],
        tier: "fine",
      },
      color(
        "field-border-color",
        "Field border color",
        "--ui-field-border-color",
        "fine",
        {
          follow: ["--ui-field-border-color-on-filled"],
          hint: "Text fields, selects and checkboxes",
        },
      ),
      {
        display: "toggle",
        id: "field-border-width",
        kind: "choice",
        label: "Field border width",
        options: [
          {
            label: "Thin",
            tokens: { "--ui-field-border-width": "1px" },
            value: "1px",
          },
          {
            label: "Thick",
            tokens: { "--ui-field-border-width": "2px" },
            value: "2px",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "Outlined buttons, chips and toggle groups",
        id: "control-outline",
        kind: "choice",
        label: "Control outlines",
        options: [
          {
            label: "Default",
            tokens: revert(
              "--ui-control-border-color",
              "--ui-control-border-color-filled",
            ),
            value: "default",
          },
          {
            label: "Field border",
            tokens: {
              ...revert("--ui-control-border-color-filled"),
              "--ui-control-border-color": "var(--ui-field-border-color)",
            },
            value: "field",
          },
          {
            label: "Bold",
            tokens: {
              "--ui-control-border-color": "var(--ui-border-color)",
              "--ui-control-border-color-filled": "var(--ui-border-color)",
            },
            value: "bold",
          },
        ],
        tier: "fine",
      },
      {
        display: "unit",
        id: "focus-ring-width",
        kind: "range",
        label: "Focus ring width",
        max: 5,
        min: 1,
        step: 1,
        tier: "fine",
        token: "--ui-focus-ring-width",
        unit: "px",
      },
      {
        display: "unit",
        hint: "Space between the control and its focus ring",
        id: "focus-ring-offset",
        kind: "range",
        label: "Focus ring gap",
        max: 4,
        min: 0,
        step: 1,
        tier: "fine",
        token: "--ui-focus-ring-offset",
        unit: "px",
      },
    ],
    description: "Lines around cards, fields and the focus ring.",
    id: "borders",
    label: "Borders and focus",
  },
  {
    controls: [
      color("critical", "Error", "--ui-critical", "basic"),
      color("info", "Info", "--ui-info", "basic"),
      color("success", "Success", "--ui-success", "basic"),
      color("warning", "Warning", "--ui-warning", "basic"),
      color("neutral", "Neutral", "--ui-neutral", "fine", {
        hint: "Neutral callouts and badges",
      }),
    ],
    description:
      "Callouts, badges and field errors. Text and fills on them are derived for contrast.",
    id: "status",
    label: "Status colors",
  },
  {
    controls: [
      {
        hint: "Buttons, fields, cards and menus",
        id: "corners",
        kind: "corners",
        label: "Roundness",
        tier: "basic",
      },
      {
        display: "toggle",
        id: "button-shape",
        kind: "choice",
        label: "Button shape",
        options: [
          {
            label: "Follow corners",
            tokens: { "--ui-button-radius": FOLLOW_RADIUS },
            value: "follow",
          },
          {
            label: "Pill",
            tokens: { "--ui-button-radius": "var(--ui-radius-round)" },
            value: "pill",
          },
        ],
        tier: "fine",
      },
      {
        display: "unit",
        fallback: FOLLOW_RADIUS,
        follows: "Follows corners",
        id: "chip-radius",
        kind: "range",
        label: "Chip corners",
        max: 2,
        min: 0,
        step: 0.125,
        tier: "fine",
        token: "--ui-chip-radius",
        unit: "rem",
      },
      {
        display: "unit",
        fallback: FOLLOW_RADIUS,
        follows: "Follows corners",
        id: "dialog-radius",
        kind: "range",
        label: "Dialog corners",
        max: 2,
        min: 0,
        step: 0.125,
        tier: "fine",
        token: "--ui-dialog-radius",
        unit: "rem",
      },
      {
        display: "unit",
        fallback: FOLLOW_RADIUS,
        follows: "Follows corners",
        id: "field-radius",
        kind: "range",
        label: "Field corners",
        max: 2,
        min: 0,
        step: 0.125,
        tier: "fine",
        token: "--ui-field-radius",
        unit: "rem",
      },
      {
        display: "unit",
        fallback: FOLLOW_RADIUS,
        follows: "Follows corners",
        id: "menu-radius",
        kind: "range",
        label: "Menu corners",
        max: 2,
        min: 0,
        step: 0.125,
        tier: "fine",
        token: "--ui-menu-radius",
        unit: "rem",
      },
    ],
    description: "How round buttons, fields, cards and dialogs are.",
    id: "corners",
    label: "Corners",
  },
  {
    controls: [
      {
        display: "select",
        font: true,
        id: "font-body",
        kind: "choice",
        label: "Font",
        options: fontOptions("--ui-font-body"),
        tier: "basic",
      },
      {
        display: "select",
        font: true,
        id: "font-heading",
        kind: "choice",
        label: "Heading font",
        options: [
          {
            group: "System",
            label: "Same as body",
            tokens: revert("--ui-font-heading"),
            value: "body",
          },
          ...fontOptions("--ui-font-heading"),
        ],
        tier: "fine",
      },
      {
        display: "select",
        font: true,
        id: "font-code",
        kind: "choice",
        label: "Code font",
        options: [
          {
            group: "System",
            label: "Default",
            tokens: revert("--ui-font-code"),
            value: "default",
          },
          ...fontOptions("--ui-font-code", CODE_FONTS),
        ],
        tier: "fine",
      },
      {
        display: "select",
        hint: "Headings and buttons",
        id: "weight-bold",
        kind: "choice",
        label: "Bold weight",
        options: weights("--ui-font-weight-bold", [500, 600, 700, 800]),
        tier: "fine",
      },
      {
        display: "select",
        hint: "Labels and table headers",
        id: "weight-semibold",
        kind: "choice",
        label: "Semibold weight",
        options: weights("--ui-font-weight-semibold", [500, 600, 700]),
        tier: "fine",
      },
      {
        display: "toggle",
        id: "heading-tracking",
        kind: "choice",
        label: "Heading letter spacing",
        options: [
          {
            label: "Normal",
            tokens: {
              "--ui-letter-spacing-display": "0",
              "--ui-letter-spacing-heading": "0",
            },
            value: "normal",
          },
          {
            label: "Tight",
            tokens: {
              "--ui-letter-spacing-display": "-0.02em",
              "--ui-letter-spacing-heading": "-0.01em",
            },
            value: "tight",
          },
          {
            label: "Tighter",
            tokens: {
              "--ui-letter-spacing-display": "-0.025em",
              "--ui-letter-spacing-heading": "-0.025em",
            },
            value: "tighter",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        id: "line-height",
        kind: "choice",
        label: "Line height",
        options: [
          {
            label: "Compact",
            tokens: {
              "--ui-line-height": "1.5",
              "--ui-line-height-relaxed": "1.5",
            },
            value: "compact",
          },
          {
            label: "Default",
            tokens: {
              "--ui-line-height": "1.6",
              "--ui-line-height-relaxed": "1.75",
            },
            value: "default",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        id: "heading-sizes",
        kind: "choice",
        label: "Heading sizes",
        options: [
          {
            label: "Fluid",
            tokens: revert(...HEADING_SIZE_TOKENS),
            value: "fluid",
          },
          {
            label: "Fixed",
            tokens: headingSizes([
              "2.8125rem",
              "2.25rem",
              "2rem",
              "1.75rem",
              "1.5rem",
              "1.375rem",
            ]),
            value: "fixed",
          },
          {
            label: "Compact",
            tokens: headingSizes([
              "min(calc(1.375rem + 1.5vi), 2.5rem)",
              "min(calc(1.325rem + 0.9vi), 2rem)",
              "min(calc(1.3rem + 0.6vi), 1.75rem)",
              "min(calc(1.275rem + 0.3vi), 1.5rem)",
              "1.25rem",
              "1rem",
            ]),
            value: "compact",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "Text in buttons, fields and menus",
        id: "control-text",
        kind: "choice",
        label: "Control text size",
        options: [
          {
            label: "Small",
            tokens: { "--ui-font-size-control": "0.875rem" },
            value: "small",
          },
          {
            label: "Body size",
            tokens: revert("--ui-font-size-control"),
            value: "body",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        id: "underline",
        kind: "choice",
        label: "Link underlines",
        options: [
          {
            label: "Default",
            tokens: revert(
              "--ui-underline-offset",
              "--ui-underline-thickness-hover",
            ),
            value: "default",
          },
          {
            label: "Loose",
            tokens: {
              "--ui-underline-offset": "4px",
              "--ui-underline-thickness-hover": "1px",
            },
            value: "loose",
          },
          {
            label: "Browser",
            tokens: {
              "--ui-underline-offset": "auto",
              "--ui-underline-thickness-hover": "auto",
            },
            value: "browser",
          },
        ],
        tier: "fine",
      },
    ],
    description: "Fonts, weights and line height.",
    id: "typography",
    label: "Typography",
  },
  {
    controls: [
      {
        display: "toggle",
        hint: "Height of buttons, fields and chips",
        id: "density",
        kind: "choice",
        label: "Control size",
        options: [
          {
            label: "Compact",
            tokens: { "--ui-density": "0.875" },
            value: "0.875",
          },
          { label: "Default", tokens: { "--ui-density": "1" }, value: "1" },
          {
            label: "Comfortable",
            tokens: { "--ui-density": "1.125" },
            value: "1.125",
          },
        ],
        tier: "basic",
      },
      {
        display: "percent",
        hint: "Gaps and padding inside components",
        id: "space-scale",
        kind: "range",
        label: "Spacing",
        max: 1.5,
        min: 0.75,
        step: 0.05,
        tier: "basic",
        token: "--ui-space-scale",
        unit: "",
      },
      {
        display: "toggle",
        id: "control-steps",
        kind: "choice",
        label: "Small and large controls",
        options: [
          {
            label: "Default",
            tokens: revert(
              "--ui-control-size-large",
              "--ui-control-size-small",
            ),
            value: "default",
          },
          {
            label: "Closer",
            tokens: {
              "--ui-control-size-large": "2.5rem",
              "--ui-control-size-small": "2rem",
            },
            value: "tight",
          },
        ],
        tier: "fine",
      },
      {
        display: "unit",
        fallback: "var(--ui-space-3)",
        id: "card-padding",
        kind: "range",
        label: "Card padding",
        max: 2,
        min: 0.5,
        step: 0.125,
        tier: "fine",
        token: "--ui-card-padding",
        unit: "rem",
      },
      {
        display: "unit",
        fallback: "var(--ui-space-3)",
        id: "list-padding",
        kind: "range",
        label: "List item padding",
        max: 1.5,
        min: 0.25,
        step: 0.125,
        tier: "fine",
        token: "--ui-list-item-padding-inline",
        unit: "rem",
      },
      {
        display: "unit",
        id: "icon-size",
        kind: "range",
        label: "Icon size",
        max: 1.5,
        min: 1,
        step: 0.125,
        tier: "fine",
        token: "--ui-icon-size",
        unit: "rem",
      },
      {
        display: "unit",
        id: "choice-size",
        kind: "range",
        label: "Checkbox and radio size",
        max: 1.5,
        min: 0.875,
        step: 0.0625,
        scale: "density",
        tier: "fine",
        token: "--ui-choice-size",
        unit: "rem",
      },
      {
        display: "toggle",
        id: "switch-shape",
        kind: "choice",
        label: "Switch shape",
        options: [
          {
            label: "Default",
            tokens: revert(...SWITCH_TOKENS),
            value: "default",
          },
          {
            label: "Compact",
            tokens: {
              "--ui-switch-thumb-size": "0.75rem",
              "--ui-switch-track-block-size": "1rem",
              "--ui-switch-track-inline-size": "2rem",
            },
            value: "compact",
          },
          {
            label: "Wide",
            tokens: {
              ...revert("--ui-switch-thumb-size"),
              "--ui-switch-track-block-size": "calc(2rem * var(--ui-density))",
              "--ui-switch-track-inline-size":
                "calc(3.25rem * var(--ui-density))",
            },
            value: "wide",
          },
        ],
        tier: "fine",
      },
    ],
    description: "How big controls are and how much room they get.",
    id: "density",
    label: "Density and spacing",
  },
  {
    controls: [
      {
        display: "select",
        hint: "Cards, menus, dialogs and buttons",
        id: "shadows",
        kind: "choice",
        label: "Shadows",
        options: [
          { label: "Default", tokens: shadows({}), value: "default" },
          {
            label: "Flat",
            tokens: shadows(
              Object.fromEntries(
                SHADOW_TOKENS.filter(
                  (token) => token !== "--ui-button-hover-translate",
                ).map((token) => [token, "none"]),
              ),
            ),
            value: "flat",
          },
          {
            label: "Subtle",
            tokens: shadows({
              "--ui-shadow-elevated": SUBTLE_SHADOW,
              "--ui-shadow-overlay": "none",
              "--ui-shadow-scroll": SUBTLE_SHADOW,
              "--ui-shadow-selected": "none",
            }),
            value: "subtle",
          },
          {
            label: "Soft",
            tokens: shadows({
              "--ui-shadow-control": "0 1px 2px 0 oklch(0 0 0 / 0.05)",
              "--ui-shadow-elevated":
                "0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1)",
              "--ui-shadow-overlay":
                "0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)",
              "--ui-shadow-scroll":
                "0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1)",
              "--ui-shadow-selected": SOFT_SHADOW,
            }),
            value: "soft",
          },
          {
            label: "Material",
            tokens: shadows({
              "--ui-button-hover-shadow": MATERIAL_SHADOW,
              "--ui-shadow-elevated": MATERIAL_SHADOW,
              "--ui-shadow-overlay": MATERIAL_SHADOW_HIGH,
              "--ui-shadow-scroll": MATERIAL_SHADOW_HIGH,
              "--ui-shadow-selected": "none",
            }),
            value: "material",
          },
          {
            label: "Hard offset",
            tokens: {
              "--ui-button-hover-shadow": "none",
              "--ui-button-hover-translate": "4px 4px",
              "--ui-shadow-control": "4px 4px 0 0 oklch(0 0 0)",
              "--ui-shadow-elevated": "var(--ui-shadow-control)",
              "--ui-shadow-field": "none",
              "--ui-shadow-overlay": "var(--ui-shadow-control)",
              "--ui-shadow-scroll": "0 2px 0 0 oklch(0 0 0)",
              "--ui-shadow-selected": "none",
              "--ui-shadow-surface": "var(--ui-shadow-control)",
            },
            value: "hard",
          },
        ],
        tier: "basic",
      },
      {
        display: "toggle",
        hint: "Animations of menus, dialogs and switches",
        id: "speed",
        kind: "choice",
        label: "Speed",
        options: [
          {
            label: "Snappy",
            tokens: {
              "--ui-duration": "0.1s",
              "--ui-duration-fast": "0.075s",
              "--ui-duration-slow": "0.15s",
            },
            value: "snappy",
          },
          {
            label: "Default",
            tokens: {
              "--ui-duration": "0.15s",
              "--ui-duration-fast": "0.1s",
              "--ui-duration-slow": "0.25s",
            },
            value: "default",
          },
          {
            label: "Relaxed",
            tokens: {
              "--ui-duration": "0.3s",
              "--ui-duration-fast": "0.1s",
              "--ui-duration-slow": "0.5s",
            },
            value: "relaxed",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        id: "easing",
        kind: "choice",
        label: "Easing",
        options: [
          {
            label: "Standard",
            tokens: revert("--ui-ease", "--ui-ease-enter", "--ui-ease-exit"),
            value: "standard",
          },
          {
            label: "Emphasized",
            tokens: {
              "--ui-ease": "cubic-bezier(0.2, 0, 0, 1)",
              "--ui-ease-enter": "cubic-bezier(0.05, 0.7, 0.1, 1)",
              "--ui-ease-exit": "cubic-bezier(0.3, 0, 0.8, 0.15)",
            },
            value: "emphasized",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "Springy checks, switches, tabs and menus, and buttons that give a little when pressed",
        id: "motion-personality",
        kind: "choice",
        label: "Motion personality",
        options: [
          {
            label: "Calm",
            tokens: revert("--ui-ease-move", "--ui-press-scale"),
            value: "calm",
          },
          {
            label: "Lively",
            tokens: {
              "--ui-ease-move":
                "linear(0, 0.066, 0.218, 0.4, 0.578, 0.731, 0.852, 0.94, 0.998, 1.031, 1.047, 1.05, 1.046, 1.038, 1.029, 1.02, 1.012, 1.007, 1.002, 1, 1)",
              "--ui-press-scale": "0.97",
            },
            value: "lively",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "Behind dialogs and drawers",
        id: "backdrop-blur",
        kind: "choice",
        label: "Backdrop blur",
        options: [
          {
            label: "Off",
            tokens: { "--ui-backdrop-blur": "0px" },
            value: "off",
          },
          { label: "On", tokens: { "--ui-backdrop-blur": "1px" }, value: "on" },
        ],
        tier: "fine",
      },
    ],
    description: "Shadows and animation.",
    id: "depth",
    label: "Depth and motion",
  },
  {
    controls: [
      {
        display: "toggle",
        hint: "Buttons without a color, checkboxes and switches",
        id: "control-accent",
        kind: "choice",
        label: "Default controls",
        options: [
          {
            label: "Neutral",
            tokens: revert(
              "--ui-button-accent",
              "--ui-button-on-accent",
              "--ui-control-accent",
              "--ui-on-control-accent",
            ),
            value: "neutral",
          },
          {
            label: "Brand",
            tokens: {
              ...revert("--ui-button-accent", "--ui-button-on-accent"),
              "--ui-control-accent": "var(--ui-primary)",
              "--ui-on-control-accent": "var(--ui-on-primary)",
            },
            value: "brand",
          },
          {
            label: "Gray",
            tokens: {
              ...revert("--ui-control-accent", "--ui-on-control-accent"),
              "--ui-button-accent":
                "light-dark(oklch(0.525 0.017 245), oklch(0.77 0.014 248))",
              "--ui-button-on-accent": "light-dark(oklch(1 0 0), oklch(0 0 0))",
            },
            value: "gray",
          },
        ],
        tier: "basic",
      },
      {
        display: "select",
        id: "button-weight",
        kind: "choice",
        label: "Button text weight",
        options: weights("--ui-button-font-weight", [400, 500, 600, 700]),
        tier: "basic",
      },
      {
        display: "toggle",
        hint: "Filled buttons without a color",
        id: "button-filled",
        kind: "choice",
        label: "Filled buttons",
        options: [
          {
            label: "Same as default",
            tokens: revert(
              "--ui-button-accent-filled",
              "--ui-button-on-accent-filled",
            ),
            value: "default",
          },
          {
            label: "Brand",
            tokens: {
              "--ui-button-accent-filled": "var(--ui-primary)",
              "--ui-button-on-accent-filled": "var(--ui-on-primary)",
            },
            value: "brand",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "Checkboxes, radios, switches and sliders",
        id: "choice-accent",
        kind: "choice",
        label: "Checked controls",
        options: [
          {
            label: "Same as default",
            tokens: revert("--ui-choice-accent", "--ui-choice-on-accent"),
            value: "default",
          },
          {
            label: "Brand",
            tokens: {
              "--ui-choice-accent": "var(--ui-primary)",
              "--ui-choice-on-accent": "var(--ui-on-primary)",
            },
            value: "brand",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        id: "button-padding",
        kind: "choice",
        label: "Button padding",
        options: [
          {
            label: "Compact",
            tokens: buttonPadding(["0.75rem", "1rem", "0.5rem", "0.5rem"]),
            value: "compact",
          },
          {
            label: "Default",
            tokens: revert(...BUTTON_PADDING_TOKENS),
            value: "default",
          },
          {
            label: "Roomy",
            tokens: buttonPadding(["1.5rem", "1.5rem", "1rem", "0.75rem"]),
            value: "roomy",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "How buttons react to the pointer",
        id: "button-hover",
        kind: "choice",
        label: "Hover effect",
        options: [
          {
            label: "Shade",
            tokens: { "--ui-button-hover": "shade" },
            value: "shade",
          },
          {
            label: "Layer",
            tokens: { "--ui-button-hover": "layer" },
            value: "layer",
          },
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "Hover and press feedback",
        id: "state-strength",
        kind: "choice",
        label: "Feedback strength",
        options: [
          {
            label: "Minimal",
            tokens: states([8, 10, 4, 4, 10, 4]),
            value: "minimal",
          },
          {
            label: "Subtle",
            tokens: states([10, 10, 10, 8, 8, 8]),
            value: "subtle",
          },
          {
            label: "Default",
            tokens: revert(...STATE_TOKENS),
            value: "default",
          },
        ],
        tier: "fine",
      },
      {
        display: "percent",
        id: "disabled-opacity",
        kind: "range",
        label: "Disabled opacity",
        max: 0.8,
        min: 0.4,
        step: 0.01,
        tier: "fine",
        token: "--ui-disabled-opacity",
        unit: "",
      },
      {
        display: "unit",
        fallback: "var(--ui-space-2)",
        id: "field-padding",
        kind: "range",
        label: "Field padding",
        max: 1.25,
        min: 0.25,
        step: 0.125,
        tier: "fine",
        token: "--ui-field-padding-inline",
        unit: "rem",
      },
      {
        display: "toggle",
        id: "field-bg",
        kind: "choice",
        label: "Field background",
        options: [
          {
            label: "Page",
            tokens: revert("--ui-field-bg-color"),
            value: "page",
          },
          {
            label: "Raised",
            tokens: { "--ui-field-bg-color": "var(--ui-surface-elevated)" },
            value: "raised",
          },
        ],
        tier: "fine",
      },
      {
        display: "select",
        id: "label-weight",
        kind: "choice",
        label: "Field label weight",
        options: [
          ...weights("--ui-field-label-font-weight", [400, 500]),
          {
            label: "Semibold",
            tokens: revert("--ui-field-label-font-weight"),
            value: "600",
          },
          ...weights("--ui-field-label-font-weight", [700]),
        ],
        tier: "fine",
      },
      {
        display: "toggle",
        hint: "The circle behind checkboxes and radios on hover",
        id: "ripple",
        kind: "choice",
        label: "Hover circle",
        options: [
          {
            label: "Show",
            tokens: revert("--ui-choice-ripple-bg-color"),
            value: "show",
          },
          {
            label: "Hide",
            tokens: { "--ui-choice-ripple-bg-color": "transparent" },
            value: "hide",
          },
        ],
        tier: "fine",
      },
    ],
    description: "Details of buttons, checkboxes and text fields.",
    id: "controls",
    label: "Buttons and fields",
  },
]

export const CONTROLS = GROUPS.flatMap((group) => group.controls)

export const controlTokens = (control: Control) => {
  if (control.kind === "brand") return BRAND_TOKENS
  if (control.kind === "corners") return CORNER_TOKENS
  if (control.kind === "color")
    return [control.token, ...(control.follow ?? [])]
  if (control.kind === "range") return [control.token]
  if (control.dynamic === "primary-tone") return ["--ui-primary-source"]
  if (control.dynamic === "brand-hue")
    return ["--ui-gray-chroma", "--ui-gray-hue"]
  return [
    ...new Set(control.options.flatMap((option) => Object.keys(option.tokens))),
  ].toSorted()
}

export const BUILDER_TOKENS = [
  ...new Set(CONTROLS.flatMap(controlTokens)),
].toSorted()

const block = (css: string, selector: string) => {
  const start = css.indexOf(`${selector} {`)
  if (start === -1) return ""
  let depth = 0
  for (let index = css.indexOf("{", start); index < css.length; index++) {
    if (css[index] === "{") depth++
    if (css[index] === "}" && --depth === 0) return css.slice(start, index)
  }
  return ""
}

export const libraryDefaults = (css: string) => {
  const defaults: ThemeTokens = {}
  for (const selector of [
    ":where(html)",
    ":where(html, .ui-palette, .ui-contrast-more)",
  ]) {
    for (const [, token, value] of block(css, selector).matchAll(
      /^\s*(--ui-[\w-]+):\s*([^;]+);/gm,
    )) {
      if (BUILDER_TOKENS.includes(token) && !(token in defaults)) {
        defaults[token] = value.replace(/\s+/g, " ").trim()
      }
    }
  }
  return defaults
}

export const canonical = (
  value: string | undefined,
  token: string,
  defaults: ThemeTokens,
): string =>
  value === undefined || value === REVERT
    ? token in defaults || token in UNSET_VALUES
      ? canonical(defaults[token] ?? UNSET_VALUES[token], token, {})
      : ""
    : (ALIASES[tidy(value).toLowerCase()] ?? tidy(value).toLowerCase())

export const matchOption = (
  options: ChoiceOption[],
  value: (token: string) => string | undefined,
  defaults: ThemeTokens,
) =>
  options.find((option) => {
    const tokens = Object.entries(option.tokens)
    return (
      tokens.length > 0 &&
      tokens.every(
        ([token, written]) =>
          canonical(value(token), token, defaults) ===
          canonical(written, token, defaults),
      )
    )
  }) ?? null

const RADIUS_TOKENS = CORNER_TOKENS.filter(
  (token) => !COMPONENT_RADII.includes(token),
)

export const isFollow = (value?: string) =>
  value !== undefined &&
  canonical(value, "", {}) === canonical(FOLLOW_RADIUS, "", {})

const isAccentTone = (value?: string) =>
  value !== undefined &&
  [BALANCED_PRIMARY, MONOCHROME_PRIMARY].some(
    (tone) => canonical(value, "", {}) === canonical(tone, "", {}),
  )

export const ownTokens = (control: Control, tokens: ThemeTokens) =>
  control.kind === "brand" && isAccentTone(tokens["--ui-primary-source"])
    ? ["--ui-palette-source"]
    : controlTokens(control)

export const isChanged = (
  control: Control,
  tokens: ThemeTokens,
  base: ThemeTokens,
) =>
  (control.kind === "corners"
    ? RADIUS_TOKENS
    : ownTokens(control, tokens)
  ).some(
    (token) =>
      token in tokens &&
      !(
        COMPONENT_RADII.includes(token) &&
        isFollow(tokens[token]) &&
        (base[token] === undefined || isFollow(base[token]))
      ),
  )

export const changeCount = ({ preset, tokens }: Theme) => {
  const base = exampleTheme(preset)?.tokens ?? {}
  return (
    CONTROLS.filter((control) => isChanged(control, tokens, base)).length +
    Object.keys(tokens).filter((token) => !BUILDER_TOKENS.includes(token))
      .length
  )
}
