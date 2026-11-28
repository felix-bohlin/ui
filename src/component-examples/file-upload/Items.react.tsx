import { FileUpload } from "opui-css/react"

export default function Items() {
  return (
    <FileUpload
      accept="image/*"
      description="Or drop them here. PNG or JPG."
      items={[
        {
          label: "kinga-headstock.png",
          preview: "/photos/kinga-headstock.png",
          state: "complete",
          value: "kinga",
        },
        {
          label: "adam-groove.png",
          preview: "/photos/adam-groove.png",
          progress: 0.6,
          state: "uploading",
          value: "adam",
        },
        {
          description: "Waiting for its turn",
          label: "scott-humbucker.png",
          state: "queued",
          value: "scott",
        },
      ]}
      label="Choose photos"
      multiple
    />
  )
}
