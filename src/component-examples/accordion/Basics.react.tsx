import { Accordion, AccordionContent, AccordionSummary } from "opui-css/react"

export default function Basics() {
  return (
    <Accordion>
      <AccordionSummary>What is included in free Bassbook?</AccordionSummary>
      <AccordionContent>
        <p>
          Three setlists, 2 GB of slap videos and email support. Upgrade to
          Bassbook Gold at any time to add more setlists and invite your band.
        </p>
      </AccordionContent>
    </Accordion>
  )
}
