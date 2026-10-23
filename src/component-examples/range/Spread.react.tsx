import { Range } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Range
        label="Spread Layout"
        spread
        startText="Start text"
        endText="End text"
      />

      <Range
        label="Disabled"
        spread
        disabled
        startText="Start text"
        endText="End text"
      />

      <Range
        label="Invalid Range"
        spread
        error
        endText="This value is incorrect."
        startText="Start text"
      />

      <Range
        label="Tick marks with labels"
        spread
        items={[
          { value: 0, label: "0%" },
          { value: 25, label: "25%" },
          { value: 50, label: "50%" },
          { value: 75, label: "75%" },
          { value: 100, label: "100%" },
        ]}
      />
    </>
  )
}
