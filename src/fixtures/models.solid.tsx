/** @jsxImportSource @solidjs/web */
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
} from "opui-css/solid"
import { createSignal } from "solid-js"

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

const Models = () => {
  const [actions, setActions] = createSignal(actionsOf(0))
  const [align, setAlign] = createSignal("left")
  const [error, setError] = createSignal(false)
  const [fruits, setFruits] = createSignal(fruitsOf(0))
  const [steps, setSteps] = createSignal(stepsOf(0))
  document.addEventListener("refresh-steps", () => setSteps(stepsOf(1)))
  const [name, setName] = createSignal("Ada")
  const [plan, setPlan] = createSignal("free")

  return (
    <form>
      <TextField defaultValue="Lund" error={error()} label="City" />
      <Checkbox checked={false} error={error()}>
        Newsletter
      </Checkbox>
      <Select error={error()} label="Size" value="small">
        <option value="small">Small</option>
        <option value="large">Large</option>
      </Select>
      <Select defaultValue="blue" label="Color">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </Select>
      <TextField label="Name" value={name()} />
      <Select label="Plan" value={plan()}>
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
      <ToggleGroup
        aria-label="Stored align"
        name="stored-align"
        onValueChange={setAlign}
        value={align()}
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleGroup>
      <ToggleGroup
        aria-label="Own density"
        defaultValue="compact"
        name="own-density"
      >
        <ToggleButton value="compact">Compact</ToggleButton>
        <ToggleButton value="roomy">Roomy</ToggleButton>
      </ToggleGroup>
      <Rating label="Refused rating" name="refused-rating" value={2} />
      <Menu
        id="models-menu"
        items={actions()}
        onClick={(event) => {
          if (
            event.target instanceof Element &&
            event.target.closest("button")?.textContent?.includes("Refresh")
          ) {
            setActions(actionsOf(1))
          }
        }}
        popover="manual"
      />
      <Select items={fruits()} label="Fruit" />
      <Stepper current={2} items={steps()} />
      <button onClick={() => setFruits(fruitsOf(1))} type="button">
        Refresh fruits
      </button>
      <button onClick={() => setError(!error())} type="button">
        Toggle error
      </button>
      <button
        onClick={() => {
          setName("Grace")
          setPlan("paid")
        }}
        type="button"
      >
        Set values
      </button>
      <button type="reset">Reset</button>
    </form>
  )
}

export default Models
