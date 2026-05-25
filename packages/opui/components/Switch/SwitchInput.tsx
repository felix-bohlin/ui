/* @jsxImportSource solid-js */
import { splitProps, type JSX } from "solid-js"
import type { SwitchInputProps } from "./types.solid"

export default function SwitchInput(props: SwitchInputProps) {
  return (
    <input
      type="checkbox"
      role="switch"
      {...props}
    />
  )
}
