/** @jsxImportSource @solidjs/web */
import { Select } from "opui-css/solid"

export default function Preselected() {
  return (
    <>
      <Select
        items={[
          { label: "Designer", value: "designer" },
          { label: "Developer", value: "developer" },
          { label: "Manager", value: "manager" },
        ]}
        label="Role"
        value="developer"
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
