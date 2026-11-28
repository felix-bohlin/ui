import { cx } from "../cx"
import StepperItem from "./StepperItem.react"
import type { Props } from "./types.react"

export default function Stepper({
  className,
  complete,
  completeLabel,
  current,
  errorLabel,
  items,
  orientation,
  size,
  children,
  ...rest
}: Props) {
  return (
    <ol
      className={cx([
        "ui-stepper",
        orientation && orientation !== "auto" && `ui-${orientation}`,
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      {...rest}
    >
      {items?.map((item, index) => (
        <StepperItem
          key={index}
          completeLabel={completeLabel}
          errorLabel={errorLabel}
          {...item}
          current={item.current || index === current}
          state={
            item.state ??
            (complete || (current !== undefined && index < current)
              ? "complete"
              : undefined)
          }
        />
      ))}{" "}
      {children}
    </ol>
  )
}
