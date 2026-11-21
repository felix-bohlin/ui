/** @jsxImportSource @solidjs/web */
import {
  CharacterCount,
  Checkbox,
  Field,
  Menu,
  NumberField,
  PasswordToggle,
  Rating,
  SelectButton,
  Stepper,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  ToggleButton,
  ToggleGroup,
} from "opui-css/solid"
import { createSignal, For } from "solid-js"

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
      <Field for="models-city" label="City">
        <input
          aria-invalid={error() ? "true" : undefined}
          id="models-city"
          defaultValue="Lund"
        />
      </Field>
      <Field
        end={<PasswordToggle for="models-password" />}
        for="models-password"
        label="Password"
      >
        <input
          aria-invalid={error() ? "true" : undefined}
          id="models-password"
          type="password"
        />
      </Field>
      <NumberField for="models-quantity" label="Quantity">
        <input
          aria-invalid={error() ? "true" : undefined}
          defaultValue="1"
          id="models-quantity"
          type="number"
        />
      </NumberField>
      <Checkbox checked={false} error={error()}>
        Newsletter
      </Checkbox>
      <Field for="models-size" label="Size">
        <select aria-invalid={error() ? "true" : undefined} id="models-size">
          <SelectButton />
          <option selected value="small">
            Small
          </option>
          <option value="large">Large</option>
        </select>
      </Field>
      <Field for="models-color" label="Color">
        <select id="models-color">
          <SelectButton />
          <option value="red">Red</option>
          <option selected value="blue">
            Blue
          </option>
        </select>
      </Field>
      <Field endText={<CharacterCount />} for="models-name" label="Name">
        <input
          aria-describedby="models-name-end-text"
          id="models-name"
          maxlength={20}
          value={name()}
        />
      </Field>
      <Field for="models-plan" label="Plan">
        <select id="models-plan" value={plan()}>
          <SelectButton />
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </Field>
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
      <Field for="models-fruit" label="Fruit">
        <select id="models-fruit">
          <SelectButton />
          <For each={fruits()} keyed={(fruit) => fruit.value}>
            {(fruit) => <option value={fruit().value}>{fruit().label}</option>}
          </For>
        </select>
      </Field>
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
