<script setup lang="ts">
import { Tabs, TabsItem, TabsLabel } from "opui-css/vue"
</script>

<template>
  <p class="ui-h5">Feed</p>
  <Tabs aria-label="Show in the feed">
    <TabsItem checked>
      <TabsLabel>All</TabsLabel>
    </TabsItem>
    <TabsItem>
      <TabsLabel>Posts</TabsLabel>
    </TabsItem>
    <TabsItem>
      <TabsLabel>Events</TabsLabel>
    </TabsItem>
  </Tabs>
</template>
