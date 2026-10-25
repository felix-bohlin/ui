import Anchor from "../Anchor/Anchor.react"
import { cx } from "../cx"
import { warnMissingId } from "../dev"
import type { Props } from "./types.react"

export default function Tooltip({
  arrow,
  className,
  id,
  positionArea,
  ...rest
}: Props) {
  warnMissingId("Tooltip", id, "interestfor")

  return (
    <Anchor
      className={cx(["ui-tooltip", { "ui-arrow": arrow }, className])}
      id={id}
      positionArea={positionArea}
      trigger="hover"
      {...rest}
    />
  )
}
