<script lang="ts">
  import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/svelte"
</script>

<Tabs name="overflow-tabs" overflow="scroll">
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
  <TabsItem>
    <TabsLabel>Billing</TabsLabel>
    <TabsPanel>Plans, invoices and payment methods.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Security</TabsLabel>
    <TabsPanel>Passwords, sessions and two-factor authentication.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Integrations</TabsLabel>
    <TabsPanel>Connected apps and webhooks.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Team</TabsLabel>
    <TabsPanel>Members and roles.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsLabel>Advanced</TabsLabel>
    <TabsPanel>Export data or delete the account.</TabsPanel>
  </TabsItem>
</Tabs>
