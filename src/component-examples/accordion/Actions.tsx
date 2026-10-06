import { Accordion, Button } from "opui-css/solid"

export default function Example() {
  return (
    <Accordion
      open
      variant="elevated"
      summary="Accordion with actions"
      actions={
        <>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </>
      }
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare.
      </p>
    </Accordion>
  )
}
