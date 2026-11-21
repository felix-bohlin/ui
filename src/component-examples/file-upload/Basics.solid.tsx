/** @jsxImportSource @solidjs/web */
import { FileUpload } from "opui-css/solid"

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
