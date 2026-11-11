<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List dense>
    <ListItem label="Q3 report.pdf" />
    <ListItem
      description="Logo, colors and type in print and on the web, with an example of each in use."
      label="Brand guidelines.pdf"
    />
    <ListItem label="Photos">
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
