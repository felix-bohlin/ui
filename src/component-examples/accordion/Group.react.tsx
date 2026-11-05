import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  Card,
} from "opui-css/react"

export default function Group() {
  return (
    <Card aria-label="Shipping questions" role="group" variant="outlined">
      <Accordion>
        <AccordionSummary>How long does delivery take?</AccordionSummary>
        <AccordionContent>
          <p>
            Two to four working days within the EU, and up to ten elsewhere.
          </p>
        </AccordionContent>
      </Accordion>
      <Accordion>
        <AccordionSummary>Can I change the delivery address?</AccordionSummary>
        <AccordionContent>
          <p>
            Yes, until the order ships. Edit it under Orders in your account.
          </p>
        </AccordionContent>
      </Accordion>
      <Accordion>
        <AccordionSummary>What does shipping cost?</AccordionSummary>
        <AccordionContent>
          <p>Orders over 50 EUR ship free. Smaller orders cost 4.90 EUR.</p>
        </AccordionContent>
      </Accordion>
    </Card>
  )
}
