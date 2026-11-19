import { verifyCode } from "reference-shared"

const ERROR = "That code didn't work. Try again."

const screen = () =>
  document.querySelector<HTMLElement>('[data-screen="settings"]')

const success = (container: Element, text: string) => {
  const template = screen()!.querySelector<HTMLTemplateElement>(
    "template[data-success]",
  )!
  const callout = template.content.firstElementChild!.cloneNode(true) as Element
  callout.querySelector("p")!.textContent = text
  container.replaceChildren(callout)
}

const setStatus = (text: string) =>
  success(document.querySelector("#settings-status")!, text)

const verify = async (form: HTMLFormElement) => {
  const input = form.querySelector<HTMLInputElement>('input[name="code"]')!
  const endText = form.querySelector("[data-code-error]")!
  const status = form.querySelector("[data-two-factor-status]")!
  const ok = await verifyCode(input.value)
  if (ok) {
    input.removeAttribute("aria-invalid")
    endText.textContent = ""
    success(status, "Two-factor sign-in is on.")
  } else {
    input.setAttribute("aria-invalid", "true")
    endText.textContent = ERROR
    status.replaceChildren()
  }
}

document.addEventListener(
  "submit",
  (event) => {
    const form = event.target as HTMLFormElement
    if (!screen()?.contains(form)) return
    event.preventDefault()
    if (form.matches("[data-settings]")) setStatus("Settings saved.")
    if (form.matches("[data-two-factor]")) void verify(form)
  },
  true,
)

document.addEventListener("click", (event) => {
  if ((event.target as Element).closest("[data-delete-account]"))
    setStatus("Account deleted (not really, this is a test app).")
})
