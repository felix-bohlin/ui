/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function DropZone() {
  return (
    <TextField
      accept=".pdf,.png,.jpg"
      dropZone
      endText="PDF, PNG or JPG, up to 10 MB."
      label="Receipt"
      type="file"
    />
  )
}
