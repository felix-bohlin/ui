<script lang="ts">
  import { Tabs, TabsItem, TabsLabel } from "opui-css/svelte"
</script>

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
