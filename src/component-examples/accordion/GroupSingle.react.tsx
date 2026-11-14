import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  Card,
} from "opui-css/react"

export default function GroupSingle() {
  return (
    <Card aria-label="Plan questions" role="group" variant="outlined">
      <Accordion name="plan-questions">
        <AccordionSummary>
          Can I switch to Bassbook Gold later?
        </AccordionSummary>
        <AccordionContent>
          <p>Yes. Upgrades apply right away, downgrades at the next renewal.</p>
        </AccordionContent>
      </Accordion>
      <Accordion name="plan-questions">
        <AccordionSummary>Do you offer refunds?</AccordionSummary>
        <AccordionContent>
          <p>
            Within 14 days of purchase, for any reason (even a drummer one).
          </p>
        </AccordionContent>
      </Accordion>
    </Card>
  )
}
