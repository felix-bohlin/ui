<script setup lang="ts">
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/vue"
</script>

<template>
  <Tabs name="outlined-tabs" variant="outlined">
    <TabsItem checked>
      <TabsLabel>Profile</TabsLabel>
      <TabsPanel>Profile settings and information.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsLabel>Settings</TabsLabel>
      <TabsPanel>General account settings.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsLabel>Notifications</TabsLabel>
      <TabsPanel>Manage your notifications.</TabsPanel>
    </TabsItem>
  </Tabs>
</template>
