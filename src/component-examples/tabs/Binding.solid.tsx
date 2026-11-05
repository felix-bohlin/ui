/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Button, Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/solid"

export default function Binding() {
  const [tab, setTab] = createSignal("settings")

  function reset() {
    setTab("settings")
  }

  return (
    <>
      <Tabs name="tabs-binding" value={tab()} onValueChange={setTab}>
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
      <p class="tabs-binding-text">Selected: {tab()}</p>
      <Button class="tabs-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
