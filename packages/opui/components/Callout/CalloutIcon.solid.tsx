/** @jsxImportSource @solidjs/web */
import { omit, Show } from "solid-js"
import { useCalloutContext } from "./context.solid"
import { iconFor } from "./icons"
import { cx } from "../cx"
import type { CalloutIconProps as Props } from "./types.solid"

export default function CalloutIcon(props: Props) {
  const rest = omit(props, "class")
  const callout = useCalloutContext()
  const icon = () => iconFor(callout?.severity)

  return (
    <>
      {
        <Show when={icon()}>
          {(icon) => (
            <svg
              aria-hidden="true"
              class={cx([props.class])}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox={icon().viewBox}
              {...rest}
            >
              <path fill="currentColor" d={icon().d} />
            </svg>
          )}
        </Show>
      }
    </>
  )
}
