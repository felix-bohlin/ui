import { type ChatLine, outgoing } from "reference-shared"
import { PAGE_LOAD } from "./router.ts"

const sent: Record<string, ChatLine[]> = {}

const section = () =>
  document.querySelector<HTMLElement>('[data-screen="chat"] section[data-with]')

const append = (root: HTMLElement, line: ChatLine) => {
  if (line.kind !== "message") return
  const template = root.querySelector<HTMLTemplateElement>(
    "template[data-outgoing]",
  )!
  const message = template.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement
  const time = message.querySelector("time")!
  time.dateTime = line.datetime
  time.textContent = line.time
  message.querySelector("[data-text]")!.textContent = line.text
  root.querySelector(".ui-message-list")!.append(message)
}

document.addEventListener(PAGE_LOAD, () => {
  const root = section()
  if (!root) return
  for (const line of sent[root.dataset.with!] ?? []) append(root, line)
})

document.addEventListener(
  "submit",
  (event) => {
    const root = section()
    const form = event.target as HTMLFormElement
    if (!root?.contains(form)) return
    event.preventDefault()
    const handle = root.dataset.with!
    const mine = (sent[handle] ??= [])
    const line = outgoing(
      String(new FormData(form).get("text") ?? ""),
      mine.length,
    )
    mine.push(line)
    append(root, line)
    form.reset()
  },
  true,
)
