import type {
  HTMLAttributes as HTMLAttributesAstro,
  HTMLTag,
} from "astro/types"
import type { HTMLAttributes as HTMLAttributesSvelte } from "svelte/elements"
// import type { HTMLAttributes as HTMLAttributesVue } from "vue"

export type Framework = "astro" | "html" | "svelte" | "vue"

// prettier-ignore
type HTMLAttributes<
  F extends Framework,
  EL extends HTMLTag | keyof HTMLElementTagNameMap | undefined,
> = EL extends undefined ? never
  : F extends "astro" ? HTMLAttributesAstro<Extract<EL, HTMLTag>>
  : F extends "svelte" ? HTMLAttributesSvelte<HTMLElementTagNameMap[Extract<EL, keyof HTMLElementTagNameMap>]>
  // : F extends "vue" ? HTMLAttributesVue
  : Record<string, any>

export type FrameworkProps<
  F extends Framework,
  EL extends HTMLTag | keyof HTMLElementTagNameMap | undefined = undefined,
  P extends Record<string, any> = {},
> = EL extends undefined ? P : P & HTMLAttributes<F, EL>
