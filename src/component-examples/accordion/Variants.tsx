import { Accordion } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Accordion summary="Text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>

      <Accordion summary="Elevated" variant="elevated">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>

      <Accordion summary="Outlined" variant="outlined">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>

      <Accordion summary="Tonal" variant="tonal">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>
    </>
  )
}
