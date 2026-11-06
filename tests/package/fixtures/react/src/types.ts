import type { ComponentProps, JSX } from "react"
import type { Button } from "opui-css/react"

export const toaster: JSX.IntrinsicElements["opui-toaster"] = { duration: 3000 }
export const variant: ComponentProps<typeof Button>["variant"] = "filled"
// @ts-expect-error
export const unknownVariant: ComponentProps<typeof Button>["variant"] =
  "unknown"
