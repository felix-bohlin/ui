"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
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

  const ariaLabel = rest["aria-label"]
  const ariaLabelledBy = rest["aria-labelledby"]
  const dialogRef = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || labelled.id || ariaLabelledBy) return
    if (!header || ariaLabel) return dialog.removeAttribute("aria-labelledby")
    const heading = [...dialog.querySelectorAll("h1, h2, h3, h4, h5, h6")].find(
      (element) => !element.closest(".ui-content, .ui-footer"),
    )
    if (!heading) return dialog.removeAttribute("aria-labelledby")
    if (!heading.id) heading.id = headingId
    dialog.setAttribute("aria-labelledby", heading.id)
  })

  const setRef = useCallback(
    (dialog: HTMLDialogElement | null) => {
      dialogRef.current = dialog
      if (typeof ref === "function") return ref(dialog)
      if (ref) ref.current = dialog
    },
    [ref],
  )

  return (
    <DrawerContext
      value={{
        headingId: labelled.id === headingId ? headingId : undefined,
        id: drawerId,
      }}
    >
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
        ref={setRef}
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
