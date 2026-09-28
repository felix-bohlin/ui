<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
</script>

<List>
  <ListItem headline="Headline" end="30kB" />
  <ListItem headline="Headline" end="99%" description="Supporting text" />
  <ListItem
    headline="Headline"
    description="Supporting text that truly is quite long enough to fill up multiple lines."
    end="100+"
  />
</List>
