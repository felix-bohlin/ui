<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select label="Car">
  <option value="">Select car</option>
  <optgroup label="French cars">
    <legend>French cars</legend>
    <option>Citroën</option>
    <option>Renault</option>
  </optgroup>
  <optgroup label="Swedish cars">
    <legend>Swedish cars</legend>
    <option>Saab</option>
    <option>Volvo</option>
  </optgroup>
</Select>
