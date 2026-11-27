import { defined } from "../attrs"
import type { SwitchInputProps as Props } from "./types.react"

export default function SwitchInput({ ...rest }: Props) {
  return <input type="checkbox" role="switch" {...defined(rest)} />
}
