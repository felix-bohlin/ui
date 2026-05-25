import { Button, Card } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Card variant="outlined"
        actions={<Button variant="filled" color="primary">Action</Button>}>
        <p>Default (end) alignment</p>
      </Card>
      <Card variant="outlined" actionsAlign="start"
        actions={<Button variant="filled" color="primary">Action</Button>}>
        <p>Start alignment</p>
      </Card>
    </>
  )
}
