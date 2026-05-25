<script setup lang="ts">
import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/vue"
</script>

<template>
<Tabs class="underlined">
  <Tabs.Item open>
    <TabsTab>Profile</TabsTab>
    <TabsPanel>Profile settings and information.</TabsPanel>
  </Tabs.Item>
  <Tabs.Item>
    <TabsTab>Settings</TabsTab>
    <TabsPanel>General account settings.</TabsPanel>
  </Tabs.Item>
  <Tabs.Item>
    <TabsTab>Notifications</TabsTab>
    <TabsPanel>Manage your notifications.</TabsPanel>
  </Tabs.Item>
</Tabs>
</template>
