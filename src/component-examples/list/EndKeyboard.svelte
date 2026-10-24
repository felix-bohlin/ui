<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Save all">
    {#snippet end()}<kbd>Ctrl+Shift+S</kbd>{/snippet}
  </ListItem>
  <ListItem label="Save">
    {#snippet end()}<kbd>Ctrl+S</kbd>{/snippet}
  </ListItem>
</List>
