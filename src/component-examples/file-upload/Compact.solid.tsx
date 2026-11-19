/** @jsxImportSource @solidjs/web */
import { FileUpload } from "opui-css/solid"

export default function Compact() {
  return (
    <div style="inline-size: 20rem; max-inline-size: 100%">
      <FileUpload
        accept="image/*"
        description="Or drop them here. PNG or JPG."
        items={[
          {
            label: "lou-headstock.png",
            preview: "/photos/lou-headstock.png",
            state: "done",
            value: "lou",
          },
          {
            label: "percy-groove.png",
            preview: "/photos/percy-groove.png",
            progress: 0.6,
            state: "uploading",
            value: "percy",
          },
          {
            description: "This photo is larger than 10 MB.",
            label: "holly-humbucker.png",
            preview: "/photos/holly-humbucker.png",
            state: "error",
            value: "holly",
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
