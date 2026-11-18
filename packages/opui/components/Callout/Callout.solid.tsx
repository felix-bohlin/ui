/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { children, createUniqueId, omit } from "solid-js"
import "../../elements/callout.js"
import { defined } from "../attrs"
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
  const root = () => (props.closeButton ? "opui-callout" : "article")
  const Root = dynamic(root)
  const rootId = () => (props.closeButton ? base() : props.id)
  const role = () => (props.closeButton ? "article" : undefined)
  const content = () => {
    const resolvedCloseIcon = children(() => props.closeIcon)
    return (
      <Root
        class={[
          "ui-callout",
          props.severity && `ui-${props.severity}`,
          props.variant && props.variant !== "tonal" && `ui-${props.variant}`,
          props.class,
        ]}
        id={rootId()}
        role={role()}
        {...hydrating(root().includes("-"))}
        ref={[props.ref, hydrated]}
        {...defined(rest as object)}
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
