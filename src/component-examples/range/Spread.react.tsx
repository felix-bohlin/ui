import { Range } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Range
        endText="Headphones stay below 85 dB."
        label="Volume"
        spread
        startText="Media, calls and alerts."
      />

      <Range
        disabled
        label="Microphone"
        spread
        startText="Set by your organization."
      />

      <Range
        defaultValue="10"
        endText="Set it to 20 or more to hear alarms."
        error
        label="Alarm volume"
        spread
        startText="Rings for alarms and timers."
      />

      <Range
        items={[
          { value: 0, label: "Left" },
          { value: 50, label: "Center" },
          { value: 100, label: "Right" },
        ]}
        label="Balance"
        spread
      />
    </>
  )
}
