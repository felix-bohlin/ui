"use client"

import { useState } from "react"
import { Select } from "opui-css/react"

export default function Preselected() {
  const [role, setRole] = useState("developer")

  return (
    <>
      <Select
        label="Role"
        items={[
          { label: "Designer", value: "designer" },
          { label: "Developer", value: "developer" },
          { label: "Manager", value: "manager" },
        ]}
        value={role}
        onChange={(event) => setRole(event.currentTarget.value)}
      />

      <Select
        label="Team"
        items={[
          { label: "Design", value: "design" },
          { label: "Engineering", selected: true, value: "engineering" },
          { label: "Sales", value: "sales" },
        ]}
      />
    </>
  )
}
