<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
<List>
  <ListItem as="button" type="button" headline="Button list item" />
  <ListItem as="a" href="#clickable-list-item" headline="Link list item" />
  <ListItem type="checkbox" for="clickable-checkbox">
    <template #text><div>Checkbox list item</div></template>
    <template #end><CheckboxInput id="clickable-checkbox" name="checkbox" /></template>
  </ListItem>
</List>
</template>
