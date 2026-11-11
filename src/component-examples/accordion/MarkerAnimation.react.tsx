import { Accordion, AccordionContent, AccordionSummary } from "opui-css/react"

export default function MarkerAnimation() {
  return (
    <>
      <Accordion markerAnimation="flip" variant="outlined">
        <AccordionSummary>Flip</AccordionSummary>
        <AccordionContent>
          <p>Return any item within 30 days for a full refund.</p>
        </AccordionContent>
      </Accordion>

      <Accordion markerAnimation="rotate" variant="outlined">
        <AccordionSummary>Rotate</AccordionSummary>
        <AccordionContent>
          <p>Orders over €50 ship free within the EU.</p>
        </AccordionContent>
      </Accordion>

      <Accordion markerAnimation="turn" variant="outlined">
        <AccordionSummary
          marker={
            <svg
              aria-hidden="true"
              className="ui-marker"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8.293 19.707a1 1 0 0 1 0-1.414L14.586 12 8.293 5.707a1 1 0 1 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0"
              ></path>
            </svg>
          }
        >
          Turn
        </AccordionSummary>
        <AccordionContent>
          <p>Pay by card, bank transfer or invoice.</p>
        </AccordionContent>
      </Accordion>
    </>
  )
}
