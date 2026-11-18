<script lang="ts">
  import { Badge } from "opui-css/svelte"
</script>

<Badge corner="start-start" hideLabel label="35 unread messages">
  <svg aria-hidden="true"><!-- --></svg>
  {#snippet indicator()}35{/snippet}
</Badge>
<Badge hideLabel label="More than 99 unread messages">
  <svg aria-hidden="true"><!-- --></svg>
  {#snippet indicator()}99+{/snippet}
</Badge>
<Badge corner="end-start" hideLabel label="New messages">
  <svg aria-hidden="true"><!-- --></svg>
  {#snippet indicator()}New{/snippet}
</Badge>
<Badge corner="end-end" hideLabel label="About 3,000 unread messages">
  <svg aria-hidden="true"><!-- --></svg>
  {#snippet indicator()}3K{/snippet}
</Badge>
