"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react"
import { cx } from "../cx"
import { DrawerContext } from "./context.react"
import DrawerHeader from "./DrawerHeader.react"
import type { Props } from "./types.react"

type Element = ReactElement<{
  children?: ReactNode
  heading?: string
  id?: string
}>

const HEADING = /^h[1-6]$/

const labelHeading = (
  node: ReactNode,
  headingId: string,
): { id?: string; node: ReactNode } => {
  let id: string | undefined
  const visit = (child: ReactNode): ReactNode => {
    if (id || !isValidElement(child)) return child
    const element = child as Element
    if (element.type === DrawerHeader && element.props.heading) {
      id = headingId
      return element
    }
    if (typeof element.type === "string" && HEADING.test(element.type)) {
      id = element.props.id || headingId
      return element.props.id ? element : cloneElement(element, { id })
    }
    if (element.props.children === undefined) return element
    const children = Children.map(element.props.children, visit)
    return id ? cloneElement(element, undefined, children) : element
  }
  const result = Children.map(node, visit)
  return { id, node: id ? result : node }
}

export default function Drawer({
  backdrop = "blurred",
  className,
  closedby = "any",
  id,
  scrollLock = true,
  side = "inline-start",
  children,
  content,
  footer,
  header,
  ref,
  ...rest
}: Props) {
  const uid = useId()
  const drawerId = id || `drawer-${uid}`
  const headingId = `${drawerId}-heading`
  const labelled =
    header && !rest["aria-label"] && !rest["aria-labelledby"]
      ? labelHeading(header, headingId)
      : { node: header }

  const labelOwnHeading = (dialog: HTMLDialogElement | null) => {
    if (!dialog || !header || labelled.id) return
    if (rest["aria-label"] || rest["aria-labelledby"]) return
    const heading = dialog.querySelector("h1, h2, h3, h4, h5, h6")
    if (!heading) return
    if (!heading.id) heading.id = headingId
    dialog.setAttribute("aria-labelledby", heading.id)
  }

  return (
    <DrawerContext value={{ headingId, id: drawerId }}>
      <dialog
        className={cx([
          "ui-drawer",
          side && `ui-${side}`,
          {
            "ui-backdrop-transparent": backdrop === "transparent",
            "ui-scroll-lock": scrollLock,
          },
          className,
        ])}
        aria-labelledby={labelled.id}
        closedby={closedby}
        id={drawerId}
        ref={(dialog) => {
          labelOwnHeading(dialog)
          if (typeof ref === "function") return ref(dialog)
          if (ref) ref.current = dialog
        }}
        {...rest}
      >
        {labelled.node}
        {content && <div className="ui-content">{content}</div>}
        {children}
        {footer}
      </dialog>
    </DrawerContext>
  )
}
