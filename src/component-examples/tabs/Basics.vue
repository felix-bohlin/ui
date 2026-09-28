<script setup lang="ts">
import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/vue"
</script>

<template>
  <Tabs>
    <TabsItem open>
      <TabsTab>Profile</TabsTab>
      <TabsPanel>Profile settings and information.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Settings</TabsTab>
      <TabsPanel>General account settings.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsTab>Notifications</TabsTab>
      <TabsPanel>Manage your notifications.</TabsPanel>
    </TabsItem>
  </Tabs>
</template>
