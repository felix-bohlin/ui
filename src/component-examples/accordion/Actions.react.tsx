import {
  Accordion,
  AccordionActions,
  AccordionContent,
  AccordionSummary,
  Button,
} from "opui-css/react"

export default function Actions() {
  return (
    <Accordion open variant="elevated">
      <AccordionSummary>Accordion with actions</AccordionSummary>
      <AccordionContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare.
        </p>
      </AccordionContent>
      <AccordionActions>
        <Button>Cancel</Button>
        <Button>Agree</Button>
      </AccordionActions>
    </Accordion>
  )
}
