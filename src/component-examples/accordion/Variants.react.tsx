import { Accordion, AccordionContent, AccordionSummary } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Accordion>
        <AccordionSummary>Plain</AccordionSummary>
        <AccordionContent>
          <p>Return any item within 30 days for a full refund.</p>
        </AccordionContent>
      </Accordion>

      <Accordion variant="elevated">
        <AccordionSummary>Elevated</AccordionSummary>
        <AccordionContent>
          <p>Orders over €50 ship free within the EU.</p>
        </AccordionContent>
      </Accordion>

      <Accordion variant="outlined">
        <AccordionSummary>Outlined</AccordionSummary>
        <AccordionContent>
          <p>Pay by card, bank transfer or invoice.</p>
        </AccordionContent>
      </Accordion>

      <Accordion variant="tonal">
        <AccordionSummary>Tonal</AccordionSummary>
        <AccordionContent>
          <p>Track your order from the link in the confirmation email.</p>
        </AccordionContent>
      </Accordion>

      <Accordion variant="transparent">
        <AccordionSummary>Transparent</AccordionSummary>
        <AccordionContent>
          <p>Reach support by chat or email on weekdays from 9 to 17.</p>
        </AccordionContent>
      </Accordion>
    </>
  )
}
