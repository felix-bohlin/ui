declare const process: { env: { NODE_ENV?: string } }

const DEV =
  (import.meta as { env?: { DEV?: boolean } }).env?.DEV ??
  (typeof process !== "undefined" && process.env.NODE_ENV !== "production")

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

export const warnGroupedChecked = (
  component: string,
  grouped: unknown,
  checked: unknown,
  group = "ToggleGroup",
) => {
  if (DEV && grouped !== undefined && checked !== undefined) {
    console.warn(
      `[OPUI ${component}] \`checked\` is ignored inside a ${group} that has a \`value\`. Set the group's \`value\` instead.`,
    )
  }
}

export const warnMissingId = (
  component: string,
  id: unknown,
  attribute = "commandfor",
) => {
  if (DEV && !id) {
    console.warn(
      `[OPUI ${component}] Missing \`id\`. Pass one and point the trigger at it with \`${attribute}\`.`,
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
    console.warn(
      `[OPUI ${component}] \`id\` is replaced by the ${root.toLowerCase()}'s generated id; pass \`aria-labelledby\` on the ${root} to keep it.`,
    )
  }
}

export const warnUnnamed = (component: string, named: unknown) => {
  if (DEV && !named) {
    console.warn(
      `[OPUI ${component}] Missing accessible name. Provide a default slot, and set \`hideLabel\` to hide it visually.`,
    )
  }
}
