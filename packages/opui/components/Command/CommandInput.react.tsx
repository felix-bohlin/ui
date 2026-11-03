import { cx } from "../cx"
import type { CommandInputProps as Props } from "./types.react"

export default function CommandInput({ className, ...rest }: Props) {
  return (
    <div className={cx(["ui-header", className])}>
      <svg aria-hidden="true" height="24" viewBox="0 0 24 24" width="24">
        <path
          d="M16.102 17.162a8 8 0 1 1 1.06-1.06l4.618 4.618a.75.75 0 1 1-1.06 1.06zM17.5 11a6.5 6.5 0 1 0-13 0a6.5 6.5 0 0 0 13 0"
          fill="currentColor"
        ></path>
      </svg>
      <input type="text" {...rest} />
    </div>
  )
}
