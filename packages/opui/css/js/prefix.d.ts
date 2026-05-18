type ClassListValue =
  | string
  | Record<string, any>
  | Set<string>
  | ClassListValue[]
  | false
  | undefined

/**
 * Prefixes CSS class names with the OPUI_PREFIX environment variable, if provided.
 *
 * Transforms class names in any format that Astro's `class:list` directive accepts.
 * The prefix is only applied if the `OPUI_PREFIX` environment variable is set.
 *
 * @see https://docs.astro.build/en/reference/directives-reference/#classlist
 */
export function prefixClasses(
  pfx: string | undefined,
  classes: ClassListValue,
): Exclude<ClassListValue, false | undefined>

export function prefix(
  ...classes: ClassListValue[]
): Exclude<ClassListValue, false | undefined>
