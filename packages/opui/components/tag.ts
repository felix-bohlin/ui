const isComponent = (tag: unknown) => !!tag && typeof tag !== "string"

export const disabledLink = (tag: unknown, disabled?: boolean) =>
  !!disabled && isComponent(tag)

export const tagAttrs = (tag: unknown, disabled?: boolean, href?: string) => ({
  "aria-disabled": tag === "a" && disabled ? ("true" as const) : undefined,
  disabled: tag === "button" ? disabled : undefined,
  href: (tag === "a" || isComponent(tag)) && !disabled ? href : undefined,
  ...(tag === "a" && disabled ? { role: "link" as const } : {}),
  type: tag === "button" ? ("button" as const) : undefined,
})
