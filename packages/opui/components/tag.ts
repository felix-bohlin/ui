export const tagAttrs = (tag: string, disabled?: boolean, href?: string) => ({
  "aria-disabled": tag === "a" && disabled ? ("true" as const) : undefined,
  disabled: tag === "button" ? disabled : undefined,
  href: tag === "a" ? href : undefined,
  type: tag === "button" ? ("button" as const) : undefined,
})
