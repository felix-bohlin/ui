<script lang="ts">
  import { Select } from "opui-css/svelte"

  let role = $state("developer")
</script>

<Select
  label="Role"
  items={[
    { text: "Designer", value: "designer" },
    { text: "Developer", value: "developer" },
    { text: "Manager", value: "manager" },
  ]}
  bind:value={role}
/>

<Select
  label="Team"
  items={[
    { text: "Design", value: "design" },
    { selected: true, text: "Engineering", value: "engineering" },
    { text: "Sales", value: "sales" },
  ]}
/>
