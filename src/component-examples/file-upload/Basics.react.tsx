import { FileUpload } from "opui-css/react"

export default function Basics() {
  return (
    <FileUpload
      accept="image/*"
      description="Or drop them here. PNG or JPG."
      label="Choose photos"
      multiple
    />
  )
}
