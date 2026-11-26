import type { ComponentProps } from "svelte"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Button } from "opui-css/svelte"
import type DeepButton from "opui-css/components/Button/Button.svelte"

export const toaster: SvelteHTMLElements["opui-toaster"] = { duration: 3000 }
export const variant: ComponentProps<typeof Button>["variant"] = "filled"
export const deepVariant: ComponentProps<typeof DeepButton>["variant"] =
  "filled"
// @ts-expect-error
export const unknownVariant: ComponentProps<typeof Button>["variant"] =
  "unknown"
// @ts-expect-error
export const unknownDeepVariant: ComponentProps<typeof DeepButton>["variant"] =
  "unknown"
