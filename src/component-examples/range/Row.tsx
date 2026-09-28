import { Range } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Range spread startText="Start text" endText="End text">
        Spread Layout
      </Range>

      <Range spread disabled startText="Start text" endText="End text">
        Disabled
      </Range>

      <Range
        spread
        data-invalid
        endText="This value is incorrect."
        startText="Start text"
      >
        Invalid Range
      </Range>

      <Range
        label="Tick marks with labels"
        list="labeled-markers-spread"
        spread
        options={[
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
