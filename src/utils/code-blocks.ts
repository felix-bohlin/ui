import "@opui/elements/copy.js"
import { observeScrollRegions } from "./scroll-regions"
import { highlightCode, renewHighlightsWhenShown } from "./syntax-highlight"

document.addEventListener("syntax-highlight", () => highlightCode())
document.addEventListener("syntax-highlight", observeScrollRegions)
renewHighlightsWhenShown()
highlightCode()
