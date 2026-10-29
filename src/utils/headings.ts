export const HEADING_EXCLUSION_SELECTOR =
  'dialog, [role="dialog"], [role="alertdialog"], [role="note"], [role="status"], .build-up-stage, .example-container, .ui-accordion, .ui-card, .example-preview, [inert]'

/**
 * Filter headings to exclude those inside certain containers (dialogs, examples, etc.)
 * and those that are hidden.
 */
export function isContentHeading(heading: Element) {
  return (
    !heading.closest(HEADING_EXCLUSION_SELECTOR) && !heading.closest("[hidden]")
  )
}

/**
 * Get headings within a container, excluding those in certain sub-containers.
 */
export function getHeadings(
  container: ParentNode = document,
  selector = "h2, h3, h4",
) {
  return Array.from(
    container.querySelectorAll<HTMLHeadingElement>(selector),
  ).filter(isContentHeading)
}

export function headingId(heading: Element) {
  const parent = heading.parentElement
  return (
    heading.id ||
    (parent?.localName === "section" && parent.firstElementChild === heading
      ? parent.id
      : "")
  )
}
