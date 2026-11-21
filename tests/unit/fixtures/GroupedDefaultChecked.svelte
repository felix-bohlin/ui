<script lang="ts">
  import Tabs from "../../../packages/opui/components/Tabs/Tabs.svelte"
  import TabsItem from "../../../packages/opui/components/Tabs/TabsItem.svelte"
  import TabsLabel from "../../../packages/opui/components/Tabs/TabsLabel.svelte"
  import ToggleButton from "../../../packages/opui/components/ToggleButton/ToggleButton.svelte"
  import ToggleGroup from "../../../packages/opui/components/ToggleGroup/ToggleGroup.svelte"
</script>

<Tabs aria-label="Account" role="radiogroup" value="profile">
  <TabsItem value="profile"><TabsLabel>Profile</TabsLabel></TabsItem>
  <TabsItem defaultChecked value="security"
    ><TabsLabel>Security</TabsLabel></TabsItem
  >
</Tabs>
<ToggleGroup aria-label="Alignment" value="left">
  <ToggleButton label="left" value="left" />
  <ToggleButton defaultChecked label="right" value="right" />
</ToggleGroup>
