import { cx } from "../cx"
import StepperItem from "./StepperItem.react"
import type { Props } from "./types.react"

export default function Stepper({
  className,
  complete,
  completedLabel,
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
          completedLabel={completedLabel}
          errorLabel={errorLabel}
          key={index}
          {...item}
          complete={
            item.complete ||
            complete ||
            (current !== undefined && index < current)
          }
          current={item.current || index === current}
        />
      ))}
      {children}
    </ol>
  )
}
