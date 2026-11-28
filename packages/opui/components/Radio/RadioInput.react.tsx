import { defined } from "../attrs"
import type { RadioInputProps as Props } from "./types.react"

export default function RadioInput({ ...rest }: Props) {
  return <input type="radio" {...defined(rest)} />
}
