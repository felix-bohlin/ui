declare const process: { env: { NODE_ENV?: string } }

const DEV =
  (import.meta as { env?: { DEV?: boolean } }).env?.DEV ??
  (typeof process !== "undefined" && process.env.NODE_ENV !== "production")

const warned = new Set<string>()

const warnOnce = (message: string) => {
  if (warned.has(message)) return
  warned.add(message)
  console.warn(message)
}

export const hasName = (
  props: {
    "aria-label"?: unknown
    "aria-labelledby"?: unknown
    label?: unknown
  },
  slot: unknown,
) =>
  Boolean(
    props.label || slot || props["aria-label"] || props["aria-labelledby"],
  )

export const resetWarnings = () => {
  warned.clear()
}

export const warnGroupedChecked = (
  component: string,
  grouped: unknown,
  checked: unknown,
  group = "ToggleGroup",
) => {
  if (DEV && grouped !== undefined && checked !== undefined) {
    warnOnce(
      `[OPUI ${component}] \`checked\` is ignored inside a ${group} that has a \`value\`. Set the group's \`value\` instead.`,
    )
  }
}

export const warnMissingCloseTarget = (
  component: string,
  target: unknown,
  root: string,
) => {
  if (DEV && !target) {
    warnOnce(
      `[OPUI ${component}] \`closeButton\` adds a close button that closes a dialog through its \`id\`. Pass \`id\` on the ${root}, or outside a ${root} set \`commandfor\` to the id of the dialog to close.`,
    )
  }
}

export const warnMissingId = (
  component: string,
  id: unknown,
  attribute = "commandfor",
) => {
  if (DEV && !id) {
    warnOnce(
      `[OPUI ${component}] Missing \`id\`. Pass one and point the trigger at it with \`${attribute}\`.`,
    )
  }
}

export const warnReplacedAnchorAttributes = (
  id: unknown,
  popover: unknown,
  anchorId: unknown,
  anchorPopover: unknown,
) => {
  if (
    DEV &&
    anchorPopover != null &&
    ((id != null && anchorId != null && id !== anchorId) ||
      (popover != null && popover !== anchorPopover))
  ) {
    warnOnce(
      '[OPUI AnchorContent] `id` and `popover` are replaced by the anchor\'s, since `trigger="hover"` shows the content through `interestfor` on the trigger. Pass `id` on the Anchor.',
    )
  }
}

export const warnReplacedId = (
  component: string,
  root: string,
  id: unknown,
  generatedId: unknown,
) => {
  if (DEV && id && generatedId) {
    warnOnce(
      `[OPUI ${component}] \`id\` is replaced by the ${root.toLowerCase()}'s generated id; pass \`aria-labelledby\` on the ${root} to keep it.`,
    )
  }
}

export const warnUnnamed = (component: string, named: unknown) => {
  if (DEV && !named) {
    warnOnce(
      `[OPUI ${component}] Missing accessible name. Provide a default slot, and set \`hideLabel\` to hide it visually.`,
    )
  }
}

export const warnUnnamedGroup = (
  component: string,
  props: { "aria-label"?: unknown; "aria-labelledby"?: unknown },
) => {
  if (DEV && !props["aria-label"] && !props["aria-labelledby"]) {
    warnOnce(
      `[OPUI ${component}] Missing accessible name. Name the group with \`aria-label\`, or with \`aria-labelledby\` pointing at a visible heading.`,
    )
  }
}
