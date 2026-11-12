<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Q3 report.pdf">
      <template #end>2.4 MB</template>
    </ListItem>
    <ListItem description="Uploaded by Lena Handén" label="Team photo.jpg">
      <template #end>860 kB</template>
    </ListItem>
    <ListItem
      description="Logo, colors and type in print and on the web, with an example of each in use."
      label="Brand guidelines.pdf"
    >
      <template #end>12 MB</template>
    </ListItem>
  </List>
</template>
