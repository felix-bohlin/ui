import { Select } from "opui-css/react"

export default function AutoFit() {
  return (
    <Select
      autoFit
      items={[
        { label: "Citroën", value: "citroen" },
        { label: "Renault", value: "renault" },
        { label: "Volvo", value: "volvo" },
      ]}
      label="Car"
    />
  )
}
