import { FileUpload } from "opui-css/react"

export default function Disabled() {
  return (
    <FileUpload
      description="Uploads open again on Monday."
      disabled
      label="Choose photos"
    />
  )
}
