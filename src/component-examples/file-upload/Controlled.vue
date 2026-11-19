<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue"
import {
  FileUpload,
  type FileUploadItem,
  type RemoveDetail,
  type SelectDetail,
} from "opui-css/vue"

const items = ref<FileUploadItem[]>([])
const status = ref("")
const uploads = new Map<string, ReturnType<typeof setInterval>>()
let count = 0

onBeforeUnmount(() => uploads.forEach((timer) => clearInterval(timer)))

const upload = (file: File) => {
  const value = `photo-${++count}`
  items.value.push({
    label: file.name,
    preview: URL.createObjectURL(file),
    progress: 0,
    state: "uploading",
    value,
  })
  uploads.set(
    value,
    setInterval(() => {
      const item = items.value.find((item) => item.value === value)
      if (!item) return
      item.progress = (item.progress ?? 0) + 0.1
      if (item.progress < 1) return
      item.state = "done"
      clearInterval(uploads.get(value))
      status.value = `${file.name} is uploaded.`
    }, 400),
  )
}

const select = (event: CustomEvent<SelectDetail>) =>
  event.detail.files.forEach(upload)

const remove = (event: CustomEvent<RemoveDetail>) => {
  const { value } = event.detail
  clearInterval(uploads.get(value))
  URL.revokeObjectURL(
    items.value.find((item) => item.value === value)?.preview ?? "",
  )
  items.value = items.value.filter((item) => item.value !== value)
}
</script>

<template>
  <FileUpload
    accept="image/*"
    description="Or drop them here. Nothing leaves your browser."
    id="file-upload-controlled-1"
    :items="items"
    label="Choose photos"
    multiple
    :status="status"
    @remove="remove"
    @select="select"
  />
</template>
