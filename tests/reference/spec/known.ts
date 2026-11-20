export const UPSTREAM = "felix-bohlin/ui#443"

export const KNOWN_AXE: { id: string; reason: string; target: RegExp }[] = []

export const KNOWN_CONSOLE: { message: RegExp; reason: string }[] = []

export const KNOWN = {
  dialogForm: `${UPSTREAM}: A <form> around a Dialog's content and footer loses the dialog's layout`,
  skipLink: `${UPSTREAM}: A .ui-focusable skip link opens in the flow and pushes the header down`,
}
