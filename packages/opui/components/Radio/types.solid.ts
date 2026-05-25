import type * as Base from "./types"
import type { JSX } from "solid-js"

export type RadioProps = Base.RadioProps & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  endText?: JSX.Element
}

export type RadioInputProps = Base.RadioInputProps & JSX.InputHTMLAttributes<HTMLInputElement>
