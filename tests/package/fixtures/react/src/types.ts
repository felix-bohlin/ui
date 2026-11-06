import type { ComponentProps, JSX } from "react"
import type { Button } from "opui-css/react"
import type DeepButton from "opui-css/components/Button/Button.react"

export const toaster: JSX.IntrinsicElements["opui-toaster"] = { duration: 3000 }
export const variant: ComponentProps<typeof Button>["variant"] = "filled"
export const deepVariant: ComponentProps<typeof DeepButton>["variant"] =
  "filled"
// @ts-expect-error
export const unknownVariant: ComponentProps<typeof Button>["variant"] =
  "unknown"
// @ts-expect-error
export const unknownDeepVariant: ComponentProps<typeof DeepButton>["variant"] =
  "unknown"
