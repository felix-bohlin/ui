<script lang="ts">
  import { FileUpload, type FileUploadItem } from "opui-css/svelte"

  let items = $state<FileUploadItem[]>([])
  let status = $state("")
  const uploads = new Map<string, ReturnType<typeof setInterval>>()
  let count = 0

  $effect(() => () => uploads.forEach((timer) => clearInterval(timer)))

  const upload = (file: File) => {
    const value = `photo-${++count}`
    items.push({
      label: file.name,
      preview: URL.createObjectURL(file),
      progress: 0,
      state: "uploading",
      value,
    })
    uploads.set(
      value,
      setInterval(() => {
        const item = items.find((item) => item.value === value)
        if (!item) return
        item.progress = (item.progress ?? 0) + 0.1
        if (item.progress < 1) return
        item.state = "done"
        clearInterval(uploads.get(value))
        status = `${file.name} is uploaded.`
      }, 400),
    )
  }
</script>

<FileUpload
  accept="image/*"
  description="Or drop them here. Nothing leaves your browser."
  id="file-upload-controlled-1"
  {items}
  label="Choose photos"
  multiple
  onremove={(event) => {
    const { value } = event.detail
    clearInterval(uploads.get(value))
    URL.revokeObjectURL(
      items.find((item) => item.value === value)?.preview ?? "",
    )
    items = items.filter((item) => item.value !== value)
  }}
  onselect={(event) => event.detail.files.forEach(upload)}
  {status}
/>
