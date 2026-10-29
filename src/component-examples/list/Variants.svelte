<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Filled (default)" />
  <ListItem label="Second item" />
</List>

<List variant="tonal">
  <ListItem label="Tonal" />
  <ListItem label="Second item" />
</List>

<List variant="transparent">
  <ListItem label="Transparent" />
  <ListItem label="Second item" />
</List>
