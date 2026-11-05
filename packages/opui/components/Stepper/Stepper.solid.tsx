/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import StepperItem from "./StepperItem.solid"
import type { Props } from "./types.solid"

export default function Stepper(props: Props) {
  const rest = omit(
    props,
    "class",
    "complete",
    "completedLabel",
    "current",
    "errorLabel",
    "items",
    "orientation",
    "size",
    "children",
  )

  return (
    <ol
      class={[
        "ui-stepper",
        props.orientation &&
          props.orientation !== "auto" &&
          `ui-${props.orientation}`,
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      {...rest}
    >
      {props.items?.map((item, index) => (
        <StepperItem
          completedLabel={props.completedLabel}
          errorLabel={props.errorLabel}
          {...item}
          complete={
            item.complete ||
            props.complete ||
            (props.current !== undefined && index < props.current)
          }
          current={item.current || index === props.current}
        />
      ))}{" "}
      {props.children}
    </ol>
  )
}
