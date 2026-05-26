export const HEADING_EXCLUSION_SELECTOR =
  'dialog, [role="dialog"], [role="alertdialog"], [role="note"], [role="status"], .ui-toast, .example-container, .example-preview'

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
  selector: string = "h2, h3, h4",
) {
  return Array.from(
    container.querySelectorAll<HTMLHeadingElement>(selector),
  ).filter(isContentHeading)
}
