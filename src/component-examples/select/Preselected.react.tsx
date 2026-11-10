import { Select } from "opui-css/react"

export default function Preselected() {
  return (
    <>
      <Select
        defaultValue="developer"
        items={[
          { label: "Designer", value: "designer" },
          { label: "Developer", value: "developer" },
          { label: "Manager", value: "manager" },
        ]}
        label="Role"
      />

      <Select
        items={[
          { label: "Design", value: "design" },
          { label: "Engineering", selected: true, value: "engineering" },
          { label: "Sales", value: "sales" },
        ]}
        label="Team"
      />
    </>
  )
}
