<script lang="ts">
  import { DataGrid } from "opui-css/svelte"
  import { columns } from "./data"
</script>

<DataGrid {columns} label="Team" rows={[]}>
  {#snippet empty()}
    <p>Nobody has joined the team yet.</p>
  {/snippet}
</DataGrid>
