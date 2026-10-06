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

      <Accordion variant="elevated" summary="Elevated">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>

      <Accordion variant="outlined" summary="Outlined">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>

      <Accordion variant="tonal" summary="Tonal">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
          ac mollis neque ante id justo.
        </p>
      </Accordion>
    </>
  )
}
