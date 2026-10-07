<script lang="ts">
  import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/svelte"
</script>

<Tabs name="scrollable-tabs" scrollable>
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
  <TabsItem>
    <TabsTab>Billing</TabsTab>
    <TabsPanel>Plans, invoices and payment methods.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsTab>Security</TabsTab>
    <TabsPanel>Passwords, sessions and two-factor authentication.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsTab>Integrations</TabsTab>
    <TabsPanel>Connected apps and webhooks.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsTab>Team</TabsTab>
    <TabsPanel>Members and roles.</TabsPanel>
  </TabsItem>
  <TabsItem>
    <TabsTab>Advanced</TabsTab>
    <TabsPanel>Export data or delete the account.</TabsPanel>
  </TabsItem>
</Tabs>
