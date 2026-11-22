<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
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
} from "opui-css/vue"

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

const actions = ref(actionsOf(0))
const align = ref("left")
const error = ref(false)
const fruits = ref(fruitsOf(0))
const steps = ref(stepsOf(0))
const name = ref("Ada")
const plan = ref("free")

function refreshActions(event: MouseEvent) {
  if (
    event.target instanceof Element &&
    event.target.closest("button")?.textContent?.includes("Refresh")
  ) {
    actions.value = actionsOf(1)
  }
}

function refreshSteps() {
  steps.value = stepsOf(1)
}

function setValues() {
  name.value = "Grace"
  plan.value = "paid"
}

onMounted(() => document.addEventListener("refresh-steps", refreshSteps))
onBeforeUnmount(() =>
  document.removeEventListener("refresh-steps", refreshSteps),
)
</script>

<template>
  <form>
    <Field for="models-city" label="City">
      <input
        :aria-invalid="error ? 'true' : undefined"
        id="models-city"
        value="Lund"
      />
    </Field>
    <Field for="models-password" label="Password">
      <input
        :aria-invalid="error ? 'true' : undefined"
        id="models-password"
        type="password"
      />
      <template #end>
        <PasswordToggle for="models-password" />
      </template>
    </Field>
    <Field autoFit for="models-quantity" label="Quantity">
      <input
        :aria-invalid="error ? 'true' : undefined"
        id="models-quantity"
        type="number"
        value="1"
      />
      <template #start>
        <StepButton command="--step-down" for="models-quantity" />
      </template>
      <template #end>
        <StepButton command="--step-up" for="models-quantity" />
      </template>
    </Field>
    <Checkbox :checked="false" :error>Newsletter</Checkbox>
    <Field for="models-size" label="Size">
      <select :aria-invalid="error ? 'true' : undefined" id="models-size">
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
        maxlength="20"
        v-model="name"
      />
      <template #end-text>
        <CharacterCount />
      </template>
    </Field>
    <Field for="models-plan" label="Plan">
      <select id="models-plan" v-model="plan">
        <SelectButton />
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
    </Field>
    <Tabs model-value="profile" name="refused-tabs" role="radiogroup">
      <TabsItem value="profile">
        <TabsLabel>Profile</TabsLabel>
        <TabsPanel>Profile panel</TabsPanel>
      </TabsItem>
      <TabsItem value="billing">
        <TabsLabel>Billing</TabsLabel>
        <TabsPanel>Billing panel</TabsPanel>
      </TabsItem>
    </Tabs>
    <ToggleGroup
      aria-label="Refused view"
      model-value="grid"
      name="refused-view"
    >
      <ToggleButton value="grid">Grid</ToggleButton>
      <ToggleButton value="rows">Rows</ToggleButton>
    </ToggleGroup>
    <ToggleGroup
      aria-label="Refused style"
      :model-value="['bold']"
      multiple
      name="refused-style"
    >
      <ToggleButton value="bold">Bold</ToggleButton>
      <ToggleButton value="italic">Italic</ToggleButton>
    </ToggleGroup>
    <ToggleGroup aria-label="Stored align" name="stored-align" v-model="align">
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </ToggleGroup>
    <ToggleGroup aria-label="Own density" name="own-density">
      <ToggleButton checked value="compact">Compact</ToggleButton>
      <ToggleButton value="roomy">Roomy</ToggleButton>
    </ToggleGroup>
    <Rating label="Refused rating" :model-value="2" name="refused-rating" />
    <Menu
      id="models-menu"
      :items="actions"
      popover="manual"
      @click="refreshActions"
    />
    <Field for="models-fruit" label="Fruit">
      <select id="models-fruit">
        <SelectButton />
        <option v-for="fruit in fruits" :key="fruit.value" :value="fruit.value">
          {{ fruit.label }}
        </option>
      </select>
    </Field>
    <Stepper :current="2" :items="steps" />
    <button type="button" @click="fruits = fruitsOf(1)">Refresh fruits</button>
    <button type="button" @click="error = !error">Toggle error</button>
    <button type="button" @click="setValues">Set values</button>
    <button type="reset">Reset</button>
  </form>
</template>
