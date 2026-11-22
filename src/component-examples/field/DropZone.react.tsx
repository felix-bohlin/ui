import { Field } from "opui-css/react"

export default function DropZone() {
  return (
    <Field
      dropZone
      endText="PDF, PNG or JPG, up to 10 MB."
      htmlFor="field-drop-zone-1"
      label="Receipt"
    >
      <input
        accept=".pdf,.png,.jpg"
        aria-describedby="field-drop-zone-1-end-text"
        id="field-drop-zone-1"
        type="file"
      />
    </Field>
  )
}
