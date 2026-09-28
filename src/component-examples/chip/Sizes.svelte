<script lang="ts">
  import { Chip } from "@opui/svelte"
</script>

<Chip size="small" label="Small" />
<Chip label="Default" />
<Chip
  multiline
  style="max-width: 30ch;"
  label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales."
/>
