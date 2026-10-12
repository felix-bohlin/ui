import Anchor from "../Anchor/Anchor.react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Tooltip({
  alignment,
  arrow,
  className,
  id,
  label,
  children,
  content,
  ...rest
}: Props) {
  return (
    <Anchor
      alignment={alignment}
      className={cx(["ui-tooltip", { "ui-with-arrow": arrow }, className])}
      id={id}
      trigger="hover"
      anchored={
        <>
          {label}
          {content}
        </>
      }
      {...rest}
    >
      {children}
    </Anchor>
  )
}
