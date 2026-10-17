<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem>
      <a href="#" aria-current="page">
        <div class="ui-text">
          <p>Selected item</p>
          <p>This item has aria-current="page" on its link</p>
        </div>
      </a>
    </ListItem>
    <ListItem>
      <a href="#">
        <div class="ui-text">
          <p>Normal item</p>
        </div>
      </a>
    </ListItem>
  </List>
</template>
