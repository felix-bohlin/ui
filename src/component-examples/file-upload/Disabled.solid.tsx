/** @jsxImportSource @solidjs/web */
import { FileUpload } from "opui-css/solid"

export default function Disabled() {
  return (
    <FileUpload
      description="Uploads open again on Monday."
      disabled
      label="Choose photos"
    />
  )
}
