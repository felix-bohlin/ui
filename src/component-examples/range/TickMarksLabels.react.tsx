import { Range } from "opui-css/react"

export default function TickMarksLabels() {
  return (
    <>
      <Range
        label="Tick marks with labels"
        items={[
          { value: 0, label: "0%" },
          { value: 25, label: "25%" },
          { value: 50, label: "50%" },
          { value: 75, label: "75%" },
          { value: 100, label: "100%" },
        ]}
      />
      <Range
        datalist={
          <>
            <option value="0" label="Low"></option>
            <option value="1" label="Medium"></option>
            <option value="2" label="High"></option>
          </>
        }
        label="Quality"
        max="2"
      />
    </>
  )
}
