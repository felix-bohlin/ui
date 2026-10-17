import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/react"

export default function Filled() {
  return (
    <Tabs name="filled-tabs" variant="filled">
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
  )
}
