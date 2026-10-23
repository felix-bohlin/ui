<script lang="ts">
  import { Badge } from "opui-css/svelte"
</script>

<Badge hideLabel invisible label="5 unread messages">
  <!-- -->
  {#snippet indicator()}5{/snippet}
</Badge>
