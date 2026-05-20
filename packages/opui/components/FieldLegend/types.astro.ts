import type * as Base from "./types"
import type { HTMLAttributes, HTMLTag } from "astro/types"

// prettier-ignore
export type Props<T extends HTMLTag = "legend"> =
  | (Base.Props & { as?: T } & HTMLAttributes<T>)
