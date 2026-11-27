"use client"

import { useEffect, useRef, useState } from "react"
import { FileUpload, type FileUploadItem } from "opui-css/react"

export default function Controlled() {
  const [items, setItems] = useState<FileUploadItem[]>([])
  const [status, setStatus] = useState("")
  const count = useRef(0)
  const uploads = useRef(new Map<string, ReturnType<typeof setInterval>>())

  useEffect(() => {
    const timers = uploads.current
    return () => timers.forEach((timer) => clearInterval(timer))
  }, [])

  const upload = (file: File) => {
    const value = `photo-${++count.current}`
    const preview = URL.createObjectURL(file)
    let progress = 0
    setItems((items) => [
      ...items,
      { label: file.name, preview, progress, state: "uploading", value },
    ])
    uploads.current.set(
      value,
      setInterval(() => {
        progress += 0.1
        const done = progress >= 1
        setItems((items) =>
          items.map((item) =>
            item.value === value
              ? { ...item, progress, state: done ? "complete" : "uploading" }
              : item,
          ),
        )
        if (!done) return
        clearInterval(uploads.current.get(value))
        setStatus(`${file.name} is uploaded.`)
      }, 400),
    )
  }

  return (
    <FileUpload
      accept="image/*"
      description="Or drop them here. Nothing leaves your browser."
      id="file-upload-controlled-1"
      items={items}
      label="Choose photos"
      multiple
      onRemove={(event) => {
        const { value } = event.detail
        clearInterval(uploads.current.get(value))
        URL.revokeObjectURL(
          items.find((item) => item.value === value)?.preview ?? "",
        )
        setItems(items.filter((item) => item.value !== value))
      }}
      onSelect={(event) => event.detail.files.forEach(upload)}
      status={status}
    />
  )
}
