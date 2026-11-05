/** @jsxImportSource @solidjs/web */
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/solid"

export default function Basics() {
  return (
    <Accordion>
      <AccordionSummary>What is included in the free plan?</AccordionSummary>
      <AccordionContent>
        <p>
          Three projects, 2 GB of storage and email support. Upgrade at any time
          to add more projects and invite your team.
        </p>
      </AccordionContent>
    </Accordion>
  )
}
