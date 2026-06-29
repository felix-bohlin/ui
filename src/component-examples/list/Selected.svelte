<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
</script>

<List>
  <ListItem aria-selected="true">
    <a href="#">
      <div class="text">
        <p>Selected item</p>
        <p>This item has aria-selected="true" applied to the ListItem</p>
      </div>
    </a>
  </ListItem>
  <ListItem>
    <a href="#">
      <div class="text">
        <p>Normal item</p>
      </div>
    </a>
  </ListItem>
</List>
