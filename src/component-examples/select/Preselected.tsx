import { createSignal } from "solid-js"
import { Select } from "opui-css/solid"

export default function Example() {
  const [role, setRole] = createSignal("developer")

  return (
    <>
      <Select
        label="Role"
        items={[
          { text: "Designer", value: "designer" },
          { text: "Developer", value: "developer" },
          { text: "Manager", value: "manager" },
        ]}
        value={role()}
        onChange={(event) => setRole(event.currentTarget.value)}
      />

      <Select
        label="Team"
        items={[
          { text: "Design", value: "design" },
          { selected: true, text: "Engineering", value: "engineering" },
          { text: "Sales", value: "sales" },
        ]}
      />
    </>
  )
}
