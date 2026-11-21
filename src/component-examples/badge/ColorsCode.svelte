<script lang="ts">
  import { Badge } from "opui-css/svelte"
</script>

<Badge color="critical" hideLabel label="5 unread messages">
  <svg aria-hidden="true"><!-- --></svg>
  {#snippet indicator()}5{/snippet}
</Badge>
<Badge color="info" hideLabel label="5 unread messages">
  <svg aria-hidden="true"><!-- --></svg>
  {#snippet indicator()}5{/snippet}
</Badge>
<Badge color="neutral" hideLabel label="5 unread messages">
  <svg aria-hidden="true"><!-- --></svg>
  {#snippet indicator()}5{/snippet}
</Badge>
<Badge color="success" hideLabel label="5 unread messages">
  <svg aria-hidden="true"><!-- --></svg>
  {#snippet indicator()}5{/snippet}
</Badge>
<Badge color="warning" hideLabel label="5 unread messages">
  <svg aria-hidden="true"><!-- --></svg>
  {#snippet indicator()}5{/snippet}
</Badge>
