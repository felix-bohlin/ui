"use client"

import "../../elements/reactions.js"
import { defined } from "../attrs"
import { cx } from "../cx"
import { useHydrated, useListener } from "../react"
import ToggleButton from "../ToggleButton/ToggleButton.react"
import ToggleGroup from "../ToggleGroup/ToggleGroup.react"
import { pillsOf, usedItem } from "./pills"
import type { Props } from "./types.react"

export default function Reactions({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  className,
  items = [],
  name,
  onReaction,
  quick,
  ref,
  children,
  ...rest
}: Props) {
  const used = usedItem(items, quick)
  const pills = pillsOf(items, quick, used)
  const rootRef = useHydrated(useListener(ref, "reaction", onReaction))

  return (
    <opui-reactions
      className={cx(["ui-reactions", className])}
      quick-label={quick?.["aria-label"]}
      quick-text={quick?.label}
      quick-value={quick?.value}
      data-hydrating=""
      ref={rootRef}
      {...defined(rest)}
    >
      <ToggleGroup
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        multiple
        name={name}
      >
        {pills.map((item, index) => (
          <ToggleButton
            key={index}
            aria-label={item["aria-label"]}
            checked={!!item.checked}
            className={cx([{ "ui-suggested": quick && !used && index === 0 }])}
            value={item.value}
          >
            <span aria-hidden="true">{item.label}</span>
          </ToggleButton>
        ))}
      </ToggleGroup>{" "}
      {children}{" "}
      <span
        className="ui-sr-only"
        role="status"
        dangerouslySetInnerHTML={{ __html: "" }}
        suppressHydrationWarning
      />
    </opui-reactions>
  )
}
