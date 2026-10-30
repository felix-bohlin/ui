import { Range } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Range
        endText="End text"
        label="Spread Layout"
        spread
        startText="Start text"
      />

      <Range
        disabled
        endText="End text"
        label="Disabled"
        spread
        startText="Start text"
      />

      <Range
        endText="Pick a value below 50."
        error
        label="Invalid Range"
        spread
        startText="Start text"
      />

      <Range
        items={[
          { value: 0, label: "0%" },
          { value: 25, label: "25%" },
          { value: 50, label: "50%" },
          { value: 75, label: "75%" },
          { value: 100, label: "100%" },
        ]}
        label="Tick marks with labels"
        spread
      />
    </>
  )
}
