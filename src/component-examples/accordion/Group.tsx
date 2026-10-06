import { Accordion, Card } from "opui-css/solid"

export default function Example() {
  return (
    <Card variant="outlined" role="group">
      <Accordion summary="Accordion title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>
      <Accordion summary="Accordion title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>
      <Accordion summary="Accordion title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>
    </Card>
  )
}
