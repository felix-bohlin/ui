/** @jsxImportSource @solidjs/web */
import { For, omit } from "solid-js"
import StepperItem from "./StepperItem.solid"
import type { Props } from "./types.solid"

export default function Stepper(props: Props) {
  const rest = omit(
    props,
    "class",
    "complete",
    "completeLabel",
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
      <For each={props.items} keyed={false}>
        {(item, index) => {
          const stepperItemComplete = () =>
            item().complete ||
            props.complete ||
            (props.current !== undefined && index < props.current)
          const stepperItemCurrent = () =>
            item().current || index === props.current
          return (
            <StepperItem
              completeLabel={props.completeLabel}
              errorLabel={props.errorLabel}
              {...item()}
              complete={stepperItemComplete()}
              current={stepperItemCurrent()}
            />
          )
        }}
      </For>{" "}
      {props.children}
    </ol>
  )
}
