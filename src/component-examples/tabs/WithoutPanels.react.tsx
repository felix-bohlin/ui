import { Tabs, TabsItem, TabsLabel } from "opui-css/react"

export default function WithoutPanels() {
  return (
    <>
      <p className="ui-h5">Feed</p>
      <Tabs aria-label="Show in the feed">
        <TabsItem defaultChecked>
          <TabsLabel>All</TabsLabel>
        </TabsItem>
        <TabsItem>
          <TabsLabel>Posts</TabsLabel>
        </TabsItem>
        <TabsItem>
          <TabsLabel>Events</TabsLabel>
        </TabsItem>
      </Tabs>
    </>
  )
}
