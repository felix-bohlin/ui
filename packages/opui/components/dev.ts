export const warnUnnamed = (component: string, named: unknown) => {
  if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV && !named) {
    console.warn(
      `[OPUI ${component}] Missing accessible name. Provide a default slot, and set \`hideLabel\` to hide it visually.`,
    )
  }
}
