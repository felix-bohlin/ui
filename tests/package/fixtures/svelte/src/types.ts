import type { ComponentProps } from "svelte"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Button } from "opui-css/svelte"

export const toaster: SvelteHTMLElements["opui-toaster"] = { duration: 3000 }
export const variant: ComponentProps<typeof Button>["variant"] = "filled"
// @ts-expect-error
export const unknownVariant: ComponentProps<typeof Button>["variant"] =
  "unknown"
