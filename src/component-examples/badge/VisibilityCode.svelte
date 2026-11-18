<script lang="ts">
  import { Badge } from "opui-css/svelte"
</script>

<Badge hideLabel invisible label="5 unread messages">
  <svg aria-hidden="true"><!-- --></svg>
  {#snippet indicator()}5{/snippet}
</Badge>
