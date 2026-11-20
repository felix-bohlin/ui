export const defined = <T extends object>(attrs: T) =>
  Object.fromEntries(
    [
      ...Object.entries(attrs),
      ...Object.getOwnPropertySymbols(attrs).map(
        (key) => [key, (attrs as Record<symbol, unknown>)[key]] as const,
      ),
    ].filter(([, value]) => value != null),
  ) as T
