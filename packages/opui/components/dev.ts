export const warnGroupedChecked = (
  component: string,
  grouped: unknown,
  checked: unknown,
  group = "ToggleGroup",
) => {
  if (
    (import.meta as { env?: { DEV?: boolean } }).env?.DEV &&
    grouped !== undefined &&
    checked !== undefined
  ) {
    console.warn(
      `[OPUI ${component}] \`checked\` is ignored inside a ${group} that has a \`value\`. Set the group's \`value\` instead.`,
    )
  }
}

export const warnReplacedId = (
  component: string,
  root: string,
  id: unknown,
  generatedId: unknown,
) => {
  if (
    (import.meta as { env?: { DEV?: boolean } }).env?.DEV &&
    id &&
    generatedId
  ) {
    console.warn(
      `[OPUI ${component}] \`id\` is replaced by the ${root.toLowerCase()}'s generated id; pass \`aria-labelledby\` on the ${root} to keep it.`,
    )
  }
}

export const warnUnnamed = (component: string, named: unknown) => {
  if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV && !named) {
    console.warn(
      `[OPUI ${component}] Missing accessible name. Provide a default slot, and set \`hideLabel\` to hide it visually.`,
    )
  }
}
