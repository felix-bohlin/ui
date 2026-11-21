import { Button, Copy, Field } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Copy id="copy-basics-1">
        <Field hideLabel htmlFor="copy-basics-2" label="Invite link">
          <input
            id="copy-basics-2"
            readOnly
            value="https://example.com/invite/8f3k2"
          />
        </Field>
      </Copy>
      <Button command="--copy" commandfor="copy-basics-1" variant="outlined">
        Copy
      </Button>
    </>
  )
}
