<script lang="ts">
  import { Tabs } from "@opui/svelte"
  import { TabsItem } from "@opui/svelte"
  import { TabsPanel } from "@opui/svelte"
  import { TabsTab } from "@opui/svelte"
</script>

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
