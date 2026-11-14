import { Button, Copy, TextField } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Copy id="copy-basics-1">
        <TextField
          hideLabel
          label="Invite link"
          readOnly
          value="https://example.com/invite/8f3k2"
        />
      </Copy>
      <Button command="--copy" commandfor="copy-basics-1" variant="outlined">
        Copy
      </Button>
    </>
  )
}
