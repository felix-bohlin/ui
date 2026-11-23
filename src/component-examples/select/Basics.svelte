<script lang="ts">
  import { Field, SelectButton } from "opui-css/svelte"
</script>

<Field for="select-basics-1" label="Country">
  <select id="select-basics-1" name="country">
    <SelectButton />
    <option value="dk">Denmark</option>
    <option value="fi">Finland</option>
    <option value="no">Norway</option>
    <option value="se">Sweden</option>
  </select>
</Field>
