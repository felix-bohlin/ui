import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Textarea
        label="Code"
        placeholder="console.log('Hello, world!')"
        header="script.js"
      />

      <Textarea
        label="Comment"
        placeholder="Write a comment..."
        footer="0 / 280"
      />
    </>
  )
}
