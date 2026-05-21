<script lang="ts">
  import { Select } from "@opui/svelte"
</script>

<Select label="Grouped">
  <option value="">Select car</option>
  <div role="group">
    <label class="ui-text">Swedish cars</label>
    <option>Volvo</option>
    <option>SAAB</option>
  </div>
  <div role="group">
    <label class="ui-text">French cars</label>
    <option>Renault</option>
    <option>Citroën</option>
  </div>
</Select>
