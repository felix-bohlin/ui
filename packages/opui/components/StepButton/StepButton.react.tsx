"use client"

import { useEffect } from "react"
import type { Props } from "./types.react"

export default function StepButton({
  command,
  htmlFor,
  label,
  children,
  ...rest
}: Props) {
  const name = label ?? (command === "--step-down" ? "Decrease" : "Increase")
  useEffect(() => {
    void import("../../elements/step-button.js")
  }, [])

  return (
    <opui-step-button {...rest}>
      <button
        className="ui-button ui-round"
        type="button"
        aria-controls={htmlFor}
        aria-label={name}
        command={command}
        commandfor={htmlFor}
      >
        {children === undefined ? (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          />
        ) : (
          children
        )}
      </button>
    </opui-step-button>
  )
}
