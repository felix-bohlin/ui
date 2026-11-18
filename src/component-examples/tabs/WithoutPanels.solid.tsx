/** @jsxImportSource @solidjs/web */
import { Tabs, TabsItem, TabsLabel } from "opui-css/solid"

export default function WithoutPanels() {
  return (
    <>
      <p class="ui-h5">Feed</p>
      <Tabs aria-label="Show in the feed" role="radiogroup">
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
