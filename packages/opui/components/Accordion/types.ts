import type { Framework, FrameworkProps } from "../types"
import type { Snippet } from "svelte"

type BaseProps<F extends Framework> = {
  class?: string
  name?: string
  open?: boolean
  variant?: "default" | "outlined" | "elevated" | "tonal"
} & (F extends "svelte"
  ? {
      actions?: Snippet
      children: Snippet
      marker?: Snippet
      summary: string | Snippet
    }
  : { summary: string })

export type Props<F extends Framework> = FrameworkProps<
  F,
  "details",
  BaseProps<F>
>
