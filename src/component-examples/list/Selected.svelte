<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem
    aria-current="page"
    description="12 unread"
    href="#selected"
    label="Inbox"
  />
  <ListItem href="#selected" label="Sent" />
</List>
