<script lang="ts">
  import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/svelte"
</script>

<Tabs name="wrap-tabs" overflow="wrap" variant="line">
  <TabsItem defaultChecked>
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
  <TabsItem>
    <TabsLabel>Bassbook Gold</TabsLabel>
    <TabsPanel>Your plan, receipts and payment methods.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Security</TabsLabel>
    <TabsPanel>Passwords, sessions and two-factor authentication.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Gear</TabsLabel>
    <TabsPanel>Your basses, amps and pedalboards.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Bands</TabsLabel>
    <TabsPanel>Your bands and who plays what.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Advanced</TabsLabel>
    <TabsPanel>Export data or delete the account.</TabsPanel>
  </TabsItem>
</Tabs>
