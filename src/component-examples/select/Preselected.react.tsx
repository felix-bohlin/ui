import { Select } from "opui-css/react"

export default function Preselected() {
  return (
    <>
      <Select
        defaultValue="bass"
        items={[
          { label: "Backing vocals", value: "backing-vocals" },
          { label: "Bass", value: "bass" },
          { label: "Tambourine", value: "tambourine" },
        ]}
        label="Role"
      />

      <Select
        items={[
          { label: "Brad and the Brads", value: "brad-and-the-brads" },
          { label: "Low End Theory", selected: true, value: "low-end-theory" },
          { label: "The Low Enders", value: "the-low-enders" },
        ]}
        label="Band"
      />
    </>
  )
}
