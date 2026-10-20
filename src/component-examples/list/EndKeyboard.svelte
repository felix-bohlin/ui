<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem headline="Save all">
    {#snippet end()}<kbd>Ctrl+Shift+S</kbd>{/snippet}
  </ListItem>
  <ListItem headline="Save">
    {#snippet end()}<kbd>Ctrl+S</kbd>{/snippet}
  </ListItem>
</List>
