import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  Omit<
    JSX.FieldsetHTMLAttributes<HTMLFieldSetElement> &
      JSX.MeterHTMLAttributes<HTMLMeterElement>,
    keyof Base.Props
  >
