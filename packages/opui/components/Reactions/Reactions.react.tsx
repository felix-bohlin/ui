"use client"

import { useEffect, useRef } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Reactions({
  className,
  onReaction,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    void import("../../elements/reactions.js")
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element || !onReaction) return
    const listener = (event: Event) => onReaction(event as CustomEvent)
    element.addEventListener("reaction", listener)
    return () => element.removeEventListener("reaction", listener)
  }, [onReaction])

  return (
    <opui-reactions
      className={cx(["ui-reactions", className])}
      ref={ref}
      {...rest}
    >
      {children}
      <span className="ui-sr-only" role="status"></span>
    </opui-reactions>
  )
}
