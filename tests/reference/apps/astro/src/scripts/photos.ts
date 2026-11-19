type ViewerPhoto = { alt: string; by: string; src: string }

let index = 0

const viewer = () => document.querySelector<HTMLDialogElement>("#photo-viewer")

const photos = (dialog: HTMLDialogElement): ViewerPhoto[] =>
  JSON.parse(dialog.dataset.photos ?? "[]")

const show = (dialog: HTMLDialogElement, at: number) => {
  const all = photos(dialog)
  index = (at + all.length) % all.length
  const current = all[index]!
  dialog.querySelector("[data-viewer-count]")!.textContent =
    `Photo ${index + 1} of ${all.length}`
  const image = dialog.querySelector<HTMLImageElement>(".app-viewer-body img")!
  image.alt = current.alt
  image.src = current.src
  dialog.querySelector("[data-viewer-by]")!.textContent = `By ${current.by}`
}

document.addEventListener("click", (event) => {
  const dialog = viewer()
  if (!dialog) return
  const target = event.target as Element
  const opener = target.closest<HTMLElement>("[data-photo]")
  if (opener) {
    show(dialog, Number(opener.dataset.photo))
    dialog.showModal()
    return
  }
  const step = target.closest<HTMLElement>("[data-step]")
  if (step && dialog.contains(step))
    show(dialog, index + Number(step.dataset.step))
})

document.addEventListener("keydown", (event) => {
  const dialog = viewer()
  if (!dialog?.open) return
  if (event.key === "ArrowLeft") show(dialog, index - 1)
  if (event.key === "ArrowRight") show(dialog, index + 1)
})
