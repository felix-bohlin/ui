<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
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
</template>
