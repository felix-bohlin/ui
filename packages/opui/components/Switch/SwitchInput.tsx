import type { SwitchInputProps } from "./types.solid"

export default function SwitchInput(props: SwitchInputProps) {
  return <input type="checkbox" role="switch" {...props} />
}
