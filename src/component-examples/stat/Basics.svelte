<script lang="ts">
  import { Stat } from "opui-css/svelte"
</script>

<Stat label="Visitors">
  48 210
  {#snippet description()}
    <span class="ui-caption ui-success">+12.4%</span> from last week
  {/snippet}
</Stat>
