export const defined = <T extends object>(attrs: T) =>
  Object.fromEntries(
    Object.entries(attrs).filter(([, value]) => value != null),
  ) as T
