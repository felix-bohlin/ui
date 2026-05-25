import { Accordion, Card } from "opui-css/solid"

export default function Example() {
  return (
    <Card variant="outlined" role="group">
      <Accordion name="example-group" summary="Accordion title"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla </p></Accordion>
      <Accordion name="example-group" summary="Accordion title"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla </p></Accordion>
      <Accordion name="example-group" summary="Accordion title"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla </p></Accordion>
    </Card>
  )
}
