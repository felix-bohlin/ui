<script lang="ts">
  import {
    Checkbox,
    Menu,
    Rating,
    Select,
    Stepper,
    Tabs,
    TabsItem,
    TabsLabel,
    TabsPanel,
    TextField,
    ToggleButton,
    ToggleGroup,
  } from "opui-css/svelte"

  const actionsOf = (round: number) => [
    { keepOpen: true, label: "Refresh" },
    { label: "Rename" },
    { label: `Round ${round}` },
  ]

  const fruitsOf = (round: number) =>
    ["apple", "banana", "cherry"].map((value) => ({
      label: `${value} ${round}`,
      value,
    }))

  const stepsOf = (round: number) => [
    { complete: true, href: "#account", label: `Account ${round}` },
    { complete: true, href: "#address", label: "Address" },
    { label: "Payment" },
  ]

  let actions = $state(actionsOf(0))
  let align = $state("left")
  let error = $state(false)
  let fruits = $state(fruitsOf(0))
  let steps = $state(stepsOf(0))
  let name = $state("Ada")
  let plan = $state("free")

  $effect(() => {
    const refresh = () => {
      steps = stepsOf(1)
    }
    document.addEventListener("refresh-steps", refresh)
    return () => document.removeEventListener("refresh-steps", refresh)
  })
</script>

<form>
  <TextField defaultValue="Lund" {error} label="City" />
  <Checkbox checked={false} {error}>Newsletter</Checkbox>
  <Select {error} label="Size" value="small">
    <option value="small">Small</option>
    <option value="large">Large</option>
  </Select>
  <Select label="Color" value="blue">
    <option value="red">Red</option>
    <option value="blue">Blue</option>
  </Select>
  <TextField label="Name" bind:value={name} />
  <Select label="Plan" bind:value={plan}>
    <option value="free">Free</option>
    <option value="paid">Paid</option>
  </Select>
  <Tabs name="refused-tabs" role="radiogroup" value="profile">
    <TabsItem value="profile">
      <TabsLabel>Profile</TabsLabel>
      <TabsPanel>Profile panel</TabsPanel>
    </TabsItem>
    <TabsItem value="billing">
      <TabsLabel>Billing</TabsLabel>
      <TabsPanel>Billing panel</TabsPanel>
    </TabsItem>
  </Tabs>
  <ToggleGroup aria-label="Refused view" name="refused-view" value="grid">
    <ToggleButton value="grid">Grid</ToggleButton>
    <ToggleButton value="rows">Rows</ToggleButton>
  </ToggleGroup>
  <ToggleGroup
    aria-label="Refused style"
    multiple
    name="refused-style"
    value={["bold"]}
  >
    <ToggleButton value="bold">Bold</ToggleButton>
    <ToggleButton value="italic">Italic</ToggleButton>
  </ToggleGroup>
  <ToggleGroup aria-label="Stored align" name="stored-align" bind:value={align}>
    <ToggleButton value="left">Left</ToggleButton>
    <ToggleButton value="right">Right</ToggleButton>
  </ToggleGroup>
  <ToggleGroup aria-label="Own density" name="own-density">
    <ToggleButton checked value="compact">Compact</ToggleButton>
    <ToggleButton value="roomy">Roomy</ToggleButton>
  </ToggleGroup>
  <Rating label="Refused rating" name="refused-rating" value={2} />
  <Menu
    id="models-menu"
    items={actions}
    onclick={(event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("button")?.textContent?.includes("Refresh")
      ) {
        actions = actionsOf(1)
      }
    }}
    popover="manual"
  />
  <Select items={fruits} label="Fruit" />
  <Stepper current={2} items={steps} />
  <button
    onclick={() => {
      fruits = fruitsOf(1)
    }}
    type="button"
  >
    Refresh fruits
  </button>
  <button
    onclick={() => {
      error = !error
    }}
    type="button"
  >
    Toggle error
  </button>
  <button
    onclick={() => {
      name = "Grace"
      plan = "paid"
    }}
    type="button"
  >
    Set values
  </button>
  <button type="reset">Reset</button>
</form>
