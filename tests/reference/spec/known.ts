export const UPSTREAM = "felix-bohlin/ui#443"

export const KNOWN_AXE: { id: string; reason: string; target: RegExp }[] = []

export const KNOWN_CONSOLE: { message: RegExp; reason: string }[] = []

export const KNOWN = {
  characterCount:
    "TODO.md: opui-character-count keeps the old count when a framework sets the field's value",
  dialogForm: `${UPSTREAM}: A <form> around a Dialog's content and footer loses the dialog's layout`,
  queryNavigation:
    "TODO.md: closeOnNavigate keeps a drawer open when a link in it only changes the query",
  skipLink: `${UPSTREAM}: A .ui-focusable skip link opens in the flow and pushes the header down`,
}
