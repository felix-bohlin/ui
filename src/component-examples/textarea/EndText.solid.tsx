/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function EndText() {
  return (
    <>
      <Textarea
        endText="Visible to everyone on the team."
        label="Description"
        placeholder="What is this project about?"
      />
      <Textarea
        endText="Only you can see these."
        label="Private notes"
        placeholder="Add a note..."
        variant="filled"
      />
    </>
  )
}
