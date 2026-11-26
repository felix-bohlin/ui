import { FileUpload } from "opui-css/react"

export default function Compact() {
  return (
    <div style={{ inlineSize: "20rem", maxInlineSize: "100%" }}>
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
            description: "This photo is larger than 10 MB.",
            label: "scott-humbucker.png",
            preview: "/photos/scott-humbucker.png",
            state: "error",
            value: "scott",
          },
          {
            label: "stage-left.png",
            state: "queued",
            value: "stage",
          },
        ]}
        label="Choose photos"
        multiple
        status="1 photo didn't upload."
      />
    </div>
  )
}
