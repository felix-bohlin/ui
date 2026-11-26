export const UPSTREAM = "felix-bohlin/ui#443"

export const KNOWN_AXE: { id: string; reason: string; target: RegExp }[] = []

export const ANCHORS_VISIBLE = {
  message: /`position-visibility: anchors-visible` value has been deprecated/,
  reason:
    "A Chromium that takes anchor-visible warns about the anchors-visible fallback in css/compat/anchor.css and copy.css when it parses them in full, as for axe, until Firefox takes anchor-visible and the fallback goes",
}

export const KNOWN_CONSOLE: { message: RegExp; reason: string }[] = [
  ANCHORS_VISIBLE,
]

export const KNOWN = {
  dialogForm: `${UPSTREAM}: A <form> around a Dialog's content and footer loses the dialog's layout`,
  skipLink: `${UPSTREAM}: A .ui-focusable skip link opens in the flow and pushes the header down`,
}
