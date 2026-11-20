<script setup lang="ts">
import { ref } from "vue"
import {
  Checkbox,
  NumberField,
  Radio,
  Range,
  Rating,
  Select,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  TextField,
  ToggleButton,
  ToggleGroup,
} from "opui-css/vue"

const colors = [
  { label: "blue", value: "blue" },
  { label: "green", value: "green" },
  { label: "red", value: "red" },
]
const tabs = ["one", "two", "three"]
const views = ["day", "week", "month"]

const round = ref(0)

const state = ref({
  checkbox: true,
  group: "week",
  radio: "coffee",
  range: 40,
  rating: 3,
  select: "green",
  tabs: "two",
  text: "Ada",
  toggle: true,
})
</script>

<template>
  <form data-case="checkbox-bound">
    <Checkbox v-model="state.checkbox" label="Agree" />
    <output>{{ state.checkbox }}</output>
  </form>
  <form data-case="checkbox-rerender">
    <Checkbox checked :data-round="round" label="Agree" />
  </form>
  <form data-case="checkbox-default">
    <Checkbox checked label="Agree" />
  </form>
  <form data-case="checkbox-empty">
    <Checkbox label="Agree" />
  </form>
  <form data-case="group-bound">
    <ToggleGroup v-model="state.group" aria-label="View" name="view">
      <ToggleButton v-for="view in views" :key="view" :value="view">
        {{ view }}
      </ToggleButton>
    </ToggleGroup>
    <output>{{ state.group }}</output>
  </form>
  <form data-case="group-default">
    <ToggleGroup aria-label="View" name="view">
      <ToggleButton
        v-for="view in views"
        :key="view"
        :checked="view === 'week'"
        :value="view"
      >
        {{ view }}
      </ToggleButton>
    </ToggleGroup>
  </form>
  <form data-case="group-empty">
    <ToggleGroup aria-label="View" name="view">
      <ToggleButton v-for="view in views" :key="view" :value="view">
        {{ view }}
      </ToggleButton>
    </ToggleGroup>
  </form>
  <form data-case="number-default">
    <NumberField label="Quantity" :value="1" />
  </form>
  <form data-case="radio-bound">
    <Radio v-model="state.radio" label="Tea" name="drink" value="tea" />
    <Radio v-model="state.radio" label="Coffee" name="drink" value="coffee" />
    <output>{{ state.radio }}</output>
  </form>
  <form data-case="radio-default">
    <Radio label="Tea" name="drink" value="tea" />
    <Radio checked label="Coffee" name="drink" value="coffee" />
  </form>
  <form data-case="radio-empty">
    <Radio label="Tea" name="drink" value="tea" />
    <Radio label="Coffee" name="drink" value="coffee" />
  </form>
  <form data-case="range-bound">
    <Range v-model="state.range" label="Level" />
    <output>{{ state.range }}</output>
  </form>
  <form data-case="range-default">
    <Range label="Level" value="40" />
  </form>
  <form data-case="rating-bound">
    <Rating v-model="state.rating" label="Score" name="score" />
    <output>{{ state.rating }}</output>
  </form>
  <form data-case="rating-default">
    <Rating label="Score" name="score" :value="3" />
  </form>
  <form data-case="rating-empty">
    <Rating label="Score" name="score" />
  </form>
  <form data-case="select-bound">
    <Select v-model="state.select" :items="colors" label="Color" />
    <output>{{ state.select }}</output>
  </form>
  <form data-case="select-default">
    <Select :items="colors" label="Color" value="green" />
  </form>
  <form data-case="tabs-bound">
    <Tabs v-model="state.tabs" name="tab">
      <TabsItem v-for="tab in tabs" :key="tab" :value="tab">
        <TabsLabel>{{ tab }}</TabsLabel>
        <TabsPanel>{{ tab }}</TabsPanel>
      </TabsItem>
    </Tabs>
    <output>{{ state.tabs }}</output>
  </form>
  <form data-case="tabs-default">
    <Tabs name="tab">
      <TabsItem
        v-for="tab in tabs"
        :key="tab"
        :checked="tab === 'two'"
        :value="tab"
      >
        <TabsLabel>{{ tab }}</TabsLabel>
        <TabsPanel>{{ tab }}</TabsPanel>
      </TabsItem>
    </Tabs>
  </form>
  <form data-case="text-bound">
    <TextField v-model="state.text" label="Name" />
    <output>{{ state.text }}</output>
  </form>
  <form data-case="text-rerender">
    <TextField :data-round="round" label="Name" value="Ada" />
  </form>
  <form data-case="text-default">
    <TextField label="Name" value="Ada" />
  </form>
  <form data-case="text-empty">
    <TextField label="Name" />
  </form>
  <form data-case="toggle-bound">
    <ToggleButton v-model="state.toggle">Bold</ToggleButton>
    <output>{{ state.toggle }}</output>
  </form>
  <form data-case="toggle-default">
    <ToggleButton checked>Bold</ToggleButton>
  </form>
  <form data-case="toggle-empty">
    <ToggleButton>Bold</ToggleButton>
  </form>
  <button data-rerender type="button" @click="round++">Render again</button>
</template>
