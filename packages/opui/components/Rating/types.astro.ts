import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props =
  | (Base.Props & { name: string } & Omit<
        HTMLAttributes<"fieldset">,
        keyof Base.Props
      >)
  | (Base.Props & { name?: undefined } & Omit<
        HTMLAttributes<"meter">,
        keyof Base.Props
      >)
