import { Button, Divider } from "opui-css/react"

export default function Content() {
  return (
    <>
      <Divider>or continue with email</Divider>

      <Divider align="start">Bassbook Gold</Divider>

      <Divider align="end" color="primary">
        Today
      </Divider>

      <Divider>
        <Button round size="small" variant="outlined">
          Show 12 more replies
        </Button>
      </Divider>
    </>
  )
}
