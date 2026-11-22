import { GROUPS } from "./theme-builder-controls"

const BY_GROUP: Record<string, string> = {
  borders: ".ui-card, .ui-table, .ui-field",
  brand: ".ui-button.ui-primary, .ui-link, .ui-switch, .ui-checkbox",
  controls: ".ui-button, .ui-checkbox, .ui-radio, .ui-switch, .ui-field",
  corners: ".ui-button, .ui-chip, .ui-card, .ui-field, .ui-dialog",
  density: ".ui-button, .ui-field, .ui-chip, .ui-card",
  depth: ".ui-card, .ui-dialog, .ui-menu",
  neutrals: ".specimen-type, .ui-card, .ui-table",
  status: ".ui-callout, .ui-chip.ui-success, .ui-chip.ui-critical",
  typography: ".specimen-type, .ui-button, .ui-field",
}

const BY_CONTROL: Record<string, string> = {
  "backdrop-blur": ".specimen-backdrop",
  "border-color": ".ui-card, .ui-table, .ui-list, .ui-divider",
  "border-width": ".ui-card, .ui-table, .ui-button.ui-outlined",
  "button-filled": ".ui-button.ui-filled:not(.ui-primary, .ui-critical)",
  "button-hover": ".ui-button",
  "button-padding": ".ui-button",
  "button-shape": ".ui-button",
  "button-weight": ".ui-button",
  "card-padding": ".ui-card",
  "chip-radius": ".ui-chip",
  "choice-accent":
    ".ui-checkbox, .ui-radio, .ui-switch, .ui-field:has(input[type=range])",
  "choice-size": ".ui-checkbox, .ui-radio",
  "code-bg": ".specimen-type code",
  "control-accent":
    ".ui-button:not(.ui-primary, .ui-critical), .ui-checkbox, .ui-switch",
  "control-outline":
    ".ui-button.ui-outlined, .ui-chip.ui-outlined, .ui-toggle-group",
  "control-steps": ".ui-button.ui-small, .ui-button.ui-large",
  "control-text": ".ui-button, .ui-field",
  critical:
    ".ui-callout.ui-critical, .ui-chip.ui-critical, .ui-button.ui-critical",
  "dialog-radius": ".ui-dialog",
  "disabled-opacity": ".ui-button, .ui-field",
  easing: ".ui-switch, .ui-menu",
  "field-bg": ".ui-field",
  "field-border-color": ".ui-field, .ui-checkbox",
  "field-border-width": ".ui-field",
  "field-padding": ".ui-field",
  "field-radius": ".ui-field",
  "focus-ring-color": ".ui-field, .ui-button",
  "focus-ring-offset": ".ui-field, .ui-button",
  "focus-ring-width": ".ui-field, .ui-button",
  "font-body": ".specimen-type p, .ui-button, .ui-field",
  "font-code": ".specimen-type code",
  "font-heading": ".ui-h2, .ui-h4",
  "gray-tint": ".specimen-type, .ui-card, .ui-chip, .ui-table",
  "heading-sizes": ".ui-h2, .ui-h4",
  "heading-tracking": ".ui-h2, .ui-h4",
  "icon-size": ".ui-callout svg",
  info: ".ui-callout.ui-info",
  inverse: ".ui-badge",
  "label-weight": ".ui-field label",
  "line-height": ".specimen-type p, .ui-list",
  "list-padding": ".ui-list",
  "menu-radius": ".ui-menu",
  "motion-personality": ".ui-tabs, .ui-button, .ui-chip, .ui-toggle-group",
  neutral:
    ".ui-callout.ui-neutral, .ui-chip:not([class*='ui-s'], [class*='ui-c'])",
  "primary-text": ".ui-link, .ui-button.ui-primary.ui-transparent",
  "primary-tone": ".ui-button.ui-primary.ui-filled, .ui-checkbox, .ui-switch",
  "raised-edges": ".ui-card, .ui-dialog, .ui-menu",
  ripple: ".ui-checkbox, .ui-radio",
  selected: ".ui-toggle-group, .ui-list, .ui-menu",
  shadows: ".ui-card, .ui-dialog, .ui-menu, .ui-button.ui-filled",
  "space-scale": ".ui-card, .ui-callout, .ui-list",
  speed: ".ui-switch, .ui-menu",
  "state-strength": ".ui-button, .ui-list",
  success: ".ui-callout.ui-success, .ui-chip.ui-success",
  surface: ".specimen",
  "surface-elevated": ".ui-dialog, .ui-menu",
  "surface-filled": ".ui-button.ui-filled:not(.ui-primary, .ui-critical)",
  "surface-tonal": ".ui-button.ui-tonal, .ui-chip, .ui-code",
  "switch-shape": ".ui-switch",
  "tabs-accent": ".ui-tabs",
  text: ".specimen-type p, .ui-list",
  "text-strong": ".ui-h2, .ui-h4, .ui-button",
  "text-subtle": ".specimen-caption, .specimen-row-label",
  tonal: ".ui-button.ui-tonal, .ui-chip",
  track: ".ui-field:has(input[type=range]), .ui-progress",
  underline: ".ui-link",
  warning: ".ui-callout.ui-warning",
  "weight-bold": ".ui-h2, .ui-h4",
  "weight-semibold": ".ui-field label, .ui-table th",
}

const groupOf = new Map(
  GROUPS.flatMap((group) =>
    group.controls.map((control) => [control.id, group.id]),
  ),
)

export const spotlightFor = (controlId: string) =>
  BY_CONTROL[controlId] ?? BY_GROUP[groupOf.get(controlId) ?? ""] ?? ""
