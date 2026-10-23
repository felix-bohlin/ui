import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/react"

export default function Line() {
  return (
    <Tabs name="line-tabs" variant="line">
      <TabsItem defaultChecked>
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
