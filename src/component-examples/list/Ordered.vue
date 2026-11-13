<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List aria-label="Top readers this month" as="ol" bordered>
    <ListItem description="42 books" label="Ines Moreau">
      <template #start>
        <span>1</span>
      </template>
    </ListItem>
    <ListItem description="37 books" label="Tomás Ekberg">
      <template #start>
        <span>2</span>
      </template>
    </ListItem>
    <ListItem description="31 books" label="Priya Natarajan">
      <template #start>
        <span>3</span>
      </template>
    </ListItem>
  </List>
</template>
