<script lang="ts">
  import { Select } from "opui-css/svelte"

  let role = $state("developer")
</script>

<Select
  label="Role"
  items={[
    { label: "Designer", value: "designer" },
    { label: "Developer", value: "developer" },
    { label: "Manager", value: "manager" },
  ]}
  bind:value={role}
/>

<Select
  label="Team"
  items={[
    { label: "Design", value: "design" },
    { label: "Engineering", selected: true, value: "engineering" },
    { label: "Sales", value: "sales" },
  ]}
/>
