<script setup lang="ts">
import { ref } from "vue"
import { Button, Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/vue"

const tab = ref("settings")

function reset() {
  tab.value = "settings"
}
</script>

<template>
  <Tabs name="tabs-binding" v-model="tab">
    <TabsItem id="tabs-binding-1" value="profile">
      <TabsLabel>Profile</TabsLabel>
      <TabsPanel>Profile settings and information.</TabsPanel>
    </TabsItem>
    <TabsItem id="tabs-binding-2" value="settings">
      <TabsLabel>Settings</TabsLabel>
      <TabsPanel>General account settings.</TabsPanel>
    </TabsItem>
    <TabsItem id="tabs-binding-3" value="notifications">
      <TabsLabel>Notifications</TabsLabel>
      <TabsPanel>Manage your notifications.</TabsPanel>
    </TabsItem>
  </Tabs>
  <p class="tabs-binding-text">Selected: {{ tab }}</p>
  <Button class="tabs-binding-reset" @click="reset">Reset</Button>
</template>
