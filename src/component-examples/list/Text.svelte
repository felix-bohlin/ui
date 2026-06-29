<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
</script>

<List>
  <ListItem headline="Headline" />
  <ListItem
    headline="Headline"
    description="Supporting text that truly is quite long enough to fill up multiple lines."
  />
  <ListItem headline="Headline">
    <p>Supporting text</p>
    <p>Even more supporting text</p>
  </ListItem>
</List>
