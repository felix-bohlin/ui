import {
  CharacterCount,
  Checkbox,
  Field,
  Menu,
  PasswordToggle,
  Rating,
  SelectButton,
  StepButton,
  Stepper,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  ToggleButton,
  ToggleGroup,
} from "opui-css/react"
import { useEffect, useState } from "react"

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

export default function Models() {
  const [actions, setActions] = useState(actionsOf(0))
  const [align, setAlign] = useState("left")
  const [error, setError] = useState(false)
  const [fruits, setFruits] = useState(fruitsOf(0))
  const [steps, setSteps] = useState(stepsOf(0))
  const [name, setName] = useState("Ada")
  const [plan, setPlan] = useState("free")

  useEffect(() => {
    const refresh = () => setSteps(stepsOf(1))
    document.addEventListener("refresh-steps", refresh)
    return () => document.removeEventListener("refresh-steps", refresh)
  }, [])

  return (
    <form>
      <Field htmlFor="models-city" label="City">
        <input
          aria-invalid={error ? "true" : undefined}
          defaultValue="Lund"
          id="models-city"
        />
      </Field>
      <Field
        end={<PasswordToggle htmlFor="models-password" />}
        htmlFor="models-password"
        label="Password"
      >
        <input
          aria-invalid={error ? "true" : undefined}
          id="models-password"
          type="password"
        />
      </Field>
      <Field
        autoFit
        end={<StepButton command="--step-up" htmlFor="models-quantity" />}
        htmlFor="models-quantity"
        label="Quantity"
        start={<StepButton command="--step-down" htmlFor="models-quantity" />}
      >
        <input
          aria-invalid={error ? "true" : undefined}
          defaultValue="1"
          id="models-quantity"
          type="number"
        />
      </Field>
      <Checkbox defaultChecked={false} error={error}>
        Newsletter
      </Checkbox>
      <Field htmlFor="models-size" label="Size">
        <select
          aria-invalid={error ? "true" : undefined}
          defaultValue="small"
          id="models-size"
        >
          <SelectButton />
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
      </Field>
      <Field htmlFor="models-color" label="Color">
        <select defaultValue="blue" id="models-color">
          <SelectButton />
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </Field>
      <Field endText={<CharacterCount />} htmlFor="models-name" label="Name">
        <input
          aria-describedby="models-name-end-text"
          id="models-name"
          maxLength={20}
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </Field>
      <Field htmlFor="models-plan" label="Plan">
        <select
          id="models-plan"
          onChange={(event) => setPlan(event.target.value)}
          value={plan}
        >
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
        value={align}
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
        items={actions}
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
      <Field htmlFor="models-fruit" label="Fruit">
        <select id="models-fruit">
          <SelectButton />
          {fruits.map((fruit) => (
            <option key={fruit.value} value={fruit.value}>
              {fruit.label}
            </option>
          ))}
        </select>
      </Field>
      <Stepper current={2} items={steps} />
      <button onClick={() => setFruits(fruitsOf(1))} type="button">
        Refresh fruits
      </button>
      <button onClick={() => setError(!error)} type="button">
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
