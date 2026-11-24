<script lang="ts">
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
  let toppings = $state(["basil", "cheese"])

  $effect(() => {
    const refresh = () => {
      steps = stepsOf(1)
    }
    document.addEventListener("refresh-steps", refresh)
    return () => document.removeEventListener("refresh-steps", refresh)
  })
</script>

<form>
  <Field for="models-city" label="City">
    <input
      aria-invalid={error ? "true" : undefined}
      id="models-city"
      defaultValue="Lund"
    />
  </Field>
  <Field for="models-password" label="Password">
    <input
      aria-invalid={error ? "true" : undefined}
      id="models-password"
      type="password"
    />
    {#snippet end()}
      <PasswordToggle for="models-password" />
    {/snippet}
  </Field>
  <Field autoFit for="models-quantity" label="Quantity">
    <input
      aria-invalid={error ? "true" : undefined}
      defaultValue="1"
      id="models-quantity"
      type="number"
    />
    {#snippet start()}
      <StepButton command="--step-down" for="models-quantity" />
    {/snippet}
    {#snippet end()}
      <StepButton command="--step-up" for="models-quantity" />
    {/snippet}
  </Field>
  <Checkbox checked={false} {error}>Newsletter</Checkbox>
  <Field for="models-size" label="Size">
    <select aria-invalid={error ? "true" : undefined} id="models-size">
      <SelectButton />
      <option selected value="small">Small</option>
      <option value="large">Large</option>
    </select>
  </Field>
  <Field for="models-color" label="Color">
    <select id="models-color">
      <SelectButton />
      <option value="red">Red</option>
      <option selected value="blue">Blue</option>
    </select>
  </Field>
  <Field for="models-name" label="Name">
    <input
      aria-describedby="models-name-end-text"
      id="models-name"
      maxlength={20}
      bind:value={name}
    />
    {#snippet endText()}
      <CharacterCount />
    {/snippet}
  </Field>
  <Field for="models-plan" label="Plan">
    <select bind:value={plan} id="models-plan">
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
  <Field for="models-fruit" label="Fruit">
    <select id="models-fruit">
      <SelectButton />
      {#each fruits as fruit (fruit.value)}
        <option value={fruit.value}>{fruit.label}</option>
      {/each}
    </select>
  </Field>
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
  <fieldset id="models-toppings">
    <legend>Toppings</legend>
    {#each ["basil", "cheese", "olives"] as topping (topping)}
      <Checkbox bind:group={toppings} value={topping}>{topping}</Checkbox>
    {/each}
    <output>{JSON.stringify(toppings)}</output>
  </fieldset>
</form>
