<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select label="Role">
  <option value="">-</option>
  <option>Designer</option>
  <option>Developer</option>
  <option>Manager</option>
</Select>

<Select label="Team" variant="filled">
  <option value="">-</option>
  <option>Design</option>
  <option>Engineering</option>
  <option>Sales</option>
</Select>
