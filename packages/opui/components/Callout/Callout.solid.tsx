/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { children, createUniqueId, omit } from "solid-js"
import "../../elements/callout.js"
import Button from "../Button/Button.solid"
import { CalloutContext } from "./context.solid"
import { hydrated, hydrating } from "../solid"
import type { Props } from "./types.solid"

export default function Callout(props: Props) {
  const rest = omit(
    props,
    "class",
    "closeButton",
    "closeLabel",
    "color",
    "id",
    "ref",
    "severity",
    "variant",
    "children",
    "closeIcon",
  )
  const uid = createUniqueId()
  const closeLabel = () =>
    props.closeLabel === undefined ? "Close" : props.closeLabel
  const base = () => props.id || `callout-${uid}`
  const root = () => (props.closeButton ? "opui-callout" : "div")
  const Root = dynamic(root)
  const rootId = () => (props.closeButton ? base() : props.id)
  const content = () => {
    const resolvedCloseIcon = children(() => props.closeIcon)
    return (
      <Root
        class={[
          "ui-callout",
          props.color && `ui-${props.color}`,
          props.severity && `ui-${props.severity}`,
          props.variant && props.variant !== "tonal" && `ui-${props.variant}`,
          props.class,
        ]}
        id={rootId()}
        {...hydrating(root().includes("-"))}
        ref={[props.ref, hydrated]}
        {...(rest as object)}
      >
        {props.children}
        {props.closeButton && (
          <Button
            aria-label={closeLabel()}
            command="--dismiss"
            commandfor={rootId()}
            round
            size="small"
          >
            {resolvedCloseIcon() === undefined ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              />
            ) : (
              resolvedCloseIcon()
            )}
          </Button>
        )}
      </Root>
    )
  }

  return (
    <CalloutContext
      value={{
        get severity() {
          return props.severity
        },
      }}
    >
      {content()}
    </CalloutContext>
  )
}
