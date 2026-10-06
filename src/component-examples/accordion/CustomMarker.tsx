import { Accordion } from "opui-css/solid"

export default function Example() {
  return (
    <Accordion
      variant="outlined"
      summary="Custom marker"
      marker={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          {/* Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE */}
          <path
            fill="currentColor"
            d="M12 3.25a.75.75 0 0 1 .75.75v7.25H20a.75.75 0 0 1 0 1.5h-7.25V20a.75.75 0 0 1-1.5 0v-7.25H4a.75.75 0 0 1 0-1.5h7.25V4a.75.75 0 0 1 .75-.75"
          ></path>
        </svg>
      }
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare.
        Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit.
        Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis
        dolor.
      </p>
    </Accordion>
  )
}
