import "@opui/elements/copy.js"
import { highlightCode, renewHighlightsWhenShown } from "./syntax-highlight"

const nameOf = (pre: Element) =>
  pre
    .closest(".code-block")
    ?.querySelector(".code-title")
    ?.textContent?.trim() || "Code"

const update = (pre: Element) => {
  if (pre.scrollWidth > pre.clientWidth) {
    pre.setAttribute("aria-label", nameOf(pre))
    pre.setAttribute("role", "group")
    pre.setAttribute("tabindex", "0")
  } else {
    pre.removeAttribute("aria-label")
    pre.removeAttribute("role")
    pre.removeAttribute("tabindex")
  }
}

const observer = new ResizeObserver((entries) => {
  for (const { target } of entries) update(target)
})

const focusScrollingCode = () => {
  for (const pre of document.querySelectorAll(".code-block pre")) {
    observer.observe(pre)
  }
}

document.addEventListener("syntax-highlight", () => highlightCode())
document.addEventListener("syntax-highlight", focusScrollingCode)
renewHighlightsWhenShown()
highlightCode()
focusScrollingCode()
