import { ref } from "vue"
import { Select } from "opui-css/solid"

const role = ref("developer")

export default function Example() {
  return (
    <>
      <Select
        label="Role"
        items={[
          { text: "Designer", value: "designer" },
          { text: "Developer", value: "developer" },
          { text: "Manager", value: "manager" },
        ]} /* TODO v-model="role" */
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
