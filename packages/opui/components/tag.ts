export const tagAttrs = (tag: string, disabled?: boolean, href?: string) => ({
  "aria-disabled": tag === "a" && disabled ? ("true" as const) : undefined,
  disabled: tag === "button" ? disabled : undefined,
  href: tag === "a" && !disabled ? href : undefined,
  type: tag === "button" ? ("button" as const) : undefined,
})
