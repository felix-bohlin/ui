<script lang="ts">
  import { Card, Divider } from "opui-css/svelte"
</script>

<Card variant="outlined">
  <div class="ui-content">Inside a card, the gap spaces the divider.</div>
  <Divider />
  <div class="ui-content">
    Nested deeper, it uses the card's tighter space.
    <Divider />
    So everything stays close together.
  </div>
</Card>

<div style="--divider-space: var(--size-1)">
  A custom space on any wrapper
  <Divider />
  reaches every divider inside it.
</div>
