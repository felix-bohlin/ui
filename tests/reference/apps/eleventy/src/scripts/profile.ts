const field = (form: HTMLFormElement, name: string) =>
  form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement

const current = () => ({
  bio: document.querySelector("[data-profile-bio]")!.textContent ?? "",
  name: document.querySelector("[data-profile-name]")!.textContent ?? "",
})

document.addEventListener("submit", (event) => {
  const form = event.target as HTMLFormElement
  if (!form.matches("[data-edit-profile]")) return
  const name = field(form, "name").value
  const bio = field(form, "bio").value
  document.querySelector("[data-profile-name]")!.textContent = name
  document.querySelector("[data-profile-bio]")!.textContent = bio
  document.title = `${name} | Reference`
})

document.addEventListener(
  "close",
  (event) => {
    const dialog = event.target as HTMLElement
    if (dialog.id !== "edit-profile") return
    const form = dialog.querySelector<HTMLFormElement>("[data-edit-profile]")!
    const { bio, name } = current()
    field(form, "name").value = name
    field(form, "bio").value = bio
  },
  true,
)
