<script lang="ts">
  import { Range } from "opui-css/svelte"
</script>

<Range>
  {#snippet label()}<code>outlined</code> (default) =
    <code>var(--ui-field-border-color)</code>{/snippet}
</Range>
<Range variant="filled">
  {#snippet label()}<code>filled</code> =
    <code>var(--ui-surface-filled)</code>{/snippet}
</Range>
<Range variant="tonal">
  {#snippet label()}<code>tonal</code> =
    <code>var(--ui-surface-tonal)</code>{/snippet}
</Range>
