<script lang="ts">
  import { Field, SelectButton } from "opui-css/svelte"
</script>

<Field for="select-preselected-1" label="Role">
  <select id="select-preselected-1">
    <SelectButton />
    <option value="backing-vocals">Backing vocals</option>
    <option selected value="bass">Bass</option>
    <option value="tambourine">Tambourine</option>
  </select>
</Field>

<Field for="select-preselected-2" label="Band">
  <select id="select-preselected-2">
    <SelectButton />
    <option value="brad-and-the-brads">Brad and the Brads</option>
    <option selected value="low-end-theory">Low End Theory</option>
    <option value="the-low-enders">The Low Enders</option>
  </select>
</Field>
