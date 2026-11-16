import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/react"

export default function Filled() {
  return (
    <Tabs name="filled-tabs" variant="filled">
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
    </Tabs>
  )
}
