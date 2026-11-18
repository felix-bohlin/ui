/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { defined } from "../attrs"
import { useCalloutContext } from "./context.solid"
import type { CalloutIconProps as Props } from "./types.solid"

export default function CalloutIcon(props: Props) {
  const rest = omit(props, "class")
  const callout = useCalloutContext()
  const severity = () => callout?.severity

  return (
    <>
      {severity() && severity() !== "neutral" && (
        <svg
          aria-hidden="true"
          class={props.class}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          {...defined(rest)}
        />
      )}
    </>
  )
}
