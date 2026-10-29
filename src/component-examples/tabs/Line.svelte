<script lang="ts">
  import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/svelte"
</script>

<Tabs name="line-tabs" variant="line">
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
