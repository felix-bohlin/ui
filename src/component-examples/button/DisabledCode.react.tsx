import { Button } from "opui-css/react"

export default function DisabledCode() {
  return (
    <>
      <Button disabled>Text</Button>
      <Button disabled href="#">
        Link
      </Button>
    </>
  )
}
