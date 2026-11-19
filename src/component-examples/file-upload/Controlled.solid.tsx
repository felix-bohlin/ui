/** @jsxImportSource @solidjs/web */
import { createSignal, onCleanup } from "solid-js"
import { FileUpload, type FileUploadItem } from "opui-css/solid"

export default function Controlled() {
  const [items, setItems] = createSignal<FileUploadItem[]>([])
  const [status, setStatus] = createSignal("")
  const uploads = new Map<string, ReturnType<typeof setInterval>>()
  let count = 0

  onCleanup(() => uploads.forEach((timer) => clearInterval(timer)))

  const upload = (file: File) => {
    const value = `photo-${++count}`
    const preview = URL.createObjectURL(file)
    let progress = 0
    setItems((items) => [
      ...items,
      { label: file.name, preview, progress, state: "uploading", value },
    ])
    uploads.set(
      value,
      setInterval(() => {
        progress += 0.1
        const done = progress >= 1
        setItems((items) =>
          items.map((item) =>
            item.value === value
              ? { ...item, progress, state: done ? "done" : "uploading" }
              : item,
          ),
        )
        if (!done) return
        clearInterval(uploads.get(value))
        setStatus(`${file.name} is uploaded.`)
      }, 400),
    )
  }

  return (
    <FileUpload
      accept="image/*"
      description="Or drop them here. Nothing leaves your browser."
      id="file-upload-controlled-1"
      items={items()}
      label="Choose photos"
      multiple
      onRemove={(event) => {
        const { value } = event.detail
        clearInterval(uploads.get(value))
        URL.revokeObjectURL(
          items().find((item) => item.value === value)?.preview ?? "",
        )
        setItems((items) => items.filter((item) => item.value !== value))
      }}
      onSelect={(event) => event.detail.files.forEach(upload)}
      status={status()}
    />
  )
}
