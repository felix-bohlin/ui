<script lang="ts">
  import { Chip } from "opui-css/svelte"
</script>

<Chip as="button" variant="tonal" label="Tonal" disabled />
<Chip as="button" variant="outlined" label="Outlined" disabled />
<Chip disabled href="#" label="Tonal link" />
<Chip aria-disabled="true" label="Archived" />
