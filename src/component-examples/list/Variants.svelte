<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem headline="Filled (default)" />
  <ListItem headline="Second item" />
</List>

<List variant="tonal">
  <ListItem headline="Tonal" />
  <ListItem headline="Second item" />
</List>

<List variant="transparent">
  <ListItem headline="Transparent" />
  <ListItem headline="Second item" />
</List>
