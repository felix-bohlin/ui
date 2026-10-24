<script lang="ts">
  import { Chip } from "opui-css/svelte"
</script>

<Chip size="x-small" label="x-small" />
<Chip size="small" label="Small" />
<Chip label="Medium" />
<Chip size="large" label="Large" />
<Chip
  multiline
  style="max-inline-size: 30ch"
  label="Free returns within 30 days on every order"
/>
