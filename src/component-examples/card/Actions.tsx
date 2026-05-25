import { Button, Card } from "opui-css/solid"

export default function Example() {
  return (
    <Card variant="outlined"
      header={<h3>Card title</h3>}
      actions={<><Button>Cancel</Button><Button variant="filled" color="primary">Save</Button></>}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor r</p>
    </Card>
  )
}
