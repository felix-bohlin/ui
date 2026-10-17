<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select label="Car">
  {#snippet header()}Company cars only{/snippet}
  {#snippet footer()}<a class="ui-link" href="#">Manage cars…</a>{/snippet}
  <option value="">-</option>
  <option>Kia EV6</option>
  <option>Volkswagen ID.4</option>
  <option>Volvo EX30</option>
</Select>
