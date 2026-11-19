import type { RemoveDetail, SelectDetail } from "../../elements/file-upload.js"

export type FileUploadItem = {
  description?: string
  label: string
  preview?: string
  progress?: number
  state: "done" | "error" | "queued" | "uploading"
  value: string
}

export type Props = {
  accept?: string
  description?: string
  disabled?: boolean
  items?: FileUploadItem[]
  label: string
  multiple?: boolean
  progressLabel?: string
  removeLabel?: string
  status?: string
}

export type Events = {
  remove: CustomEvent<RemoveDetail>
  select: CustomEvent<SelectDetail>
}

export type { RemoveDetail, SelectDetail }
