<script setup lang="ts">
import { ref } from "vue"
import {
  Checkbox,
  Field,
  Radio,
  Rating,
  SelectButton,
  StepButton,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  ToggleButton,
  ToggleGroup,
} from "opui-css/vue"

const colors = ["blue", "green", "red"]
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
  <form data-case="checkbox-default">
    <Checkbox checked label="Agree" />
  </form>
  <form data-case="checkbox-empty">
    <Checkbox label="Agree" />
  </form>
  <form data-case="checkbox-rerender">
    <Checkbox checked :data-round="round" label="Agree" />
  </form>
  <form data-case="checkbox-spread">
    <Checkbox v-bind="{ 'data-round': round }" label="Agree" />
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
    <Field autoFit for="number-default" label="Quantity">
      <input id="number-default" type="number" :value.attr="'1'" />
      <template #start>
        <StepButton command="--step-down" for="number-default" />
      </template>
      <template #end>
        <StepButton command="--step-up" for="number-default" />
      </template>
    </Field>
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
  <form data-case="radio-spread">
    <Radio
      v-bind="{ 'data-round': round }"
      label="Tea"
      name="drink"
      value="tea"
    />
    <Radio
      v-bind="{ 'data-round': round }"
      label="Coffee"
      name="drink"
      value="coffee"
    />
  </form>
  <form data-case="range-bound">
    <Field for="range-bound" label="Level">
      <input id="range-bound" v-model.number="state.range" type="range" />
    </Field>
    <output>{{ state.range }}</output>
  </form>
  <form data-case="range-default">
    <Field for="range-default" label="Level">
      <input id="range-default" type="range" :value.attr="'40'" />
    </Field>
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
  <form data-case="rating-spread">
    <Rating v-bind="{ 'data-round': round }" label="Score" name="score" />
  </form>
  <form data-case="select-bound">
    <Field for="select-bound" label="Color">
      <select id="select-bound" v-model="state.select">
        <SelectButton />
        <option v-for="color in colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
    </Field>
    <output>{{ state.select }}</output>
  </form>
  <form data-case="select-default">
    <Field for="select-default" label="Color">
      <select id="select-default">
        <SelectButton />
        <option
          v-for="color in colors"
          :key="color"
          :selected="color === 'green'"
          :value="color"
        >
          {{ color }}
        </option>
      </select>
    </Field>
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
    <Field for="text-bound" label="Name">
      <input id="text-bound" v-model="state.text" />
    </Field>
    <output>{{ state.text }}</output>
  </form>
  <form data-case="text-default">
    <Field for="text-default" label="Name">
      <input id="text-default" :value.attr="'Ada'" />
    </Field>
  </form>
  <form data-case="text-empty">
    <Field for="text-empty" label="Name">
      <input id="text-empty" />
    </Field>
  </form>
  <form data-case="text-rerender">
    <Field for="text-rerender" label="Name">
      <input :data-round="round" id="text-rerender" value="Ada" />
    </Field>
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
