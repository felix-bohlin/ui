import { splitProps, type JSX } from "solid-js"
import type { RadioInputProps } from "./types.solid"

export default function RadioInput(props: RadioInputProps) {
  return (
    <input
      type="radio"
      {...props}
    />
  )
}
