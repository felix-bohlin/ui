import { Accordion, AccordionContent, AccordionSummary } from "opui-css/react"

export default function Basics() {
  return (
    <Accordion>
      <AccordionSummary>Accordion</AccordionSummary>
      <AccordionContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare.
          Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit.
          Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis
          dolor.
        </p>
      </AccordionContent>
    </Accordion>
  )
}
