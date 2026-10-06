import { Accordion } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Accordion markerAnimation="flip" variant="outlined" summary="Flip">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>

      <Accordion markerAnimation="rotate" variant="outlined" summary="Rotate">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>

      <Accordion
        markerAnimation="turn"
        variant="outlined"
        summary="Turn"
        marker={
          <svg
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>
    </>
  )
}
