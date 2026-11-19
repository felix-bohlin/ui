export const UPSTREAM = "felix-bohlin/ui#443"

export const KNOWN_AXE = [
  {
    id: "label-content-name-mismatch",
    reason: `${UPSTREAM}: An initials Avatar as a link or button fails "label in name" with aria-label`,
    target: /ui-avatar|aria-label="Your profile"/,
  },
]

export const KNOWN_CONSOLE = [
  {
    message:
      /Buttons with an explicit type=submit will always submit a form, so command or commandfor attributes will be ignored/,
    reason: `${UPSTREAM}: Menu submit items don't close the menu: browsers ignore command on a submit button`,
  },
]

export const KNOWN = {
  dialogForm: `${UPSTREAM}: A <form> around a Dialog's content and footer loses the dialog's layout`,
  menuSubmit: KNOWN_CONSOLE[0]!.reason,
  skipLink: `${UPSTREAM}: A .ui-focusable skip link opens in the flow and pushes the header down`,
}
