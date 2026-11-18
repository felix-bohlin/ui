<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List dense>
    <ListItem label="Gig poster.pdf" />
    <ListItem
      description="Our logo in every color, with the bass drawn way bigger than the drum kit, at last."
      label="Band logo pack.pdf"
    />
    <ListItem label="Photos">
      <template #end>100+</template>
    </ListItem>
  </List>
</template>
