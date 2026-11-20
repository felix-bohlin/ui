<script setup lang="ts">
import { ref } from "vue"

const colors = ["blue", "green", "red"]
const stars = [0, 1, 2, 3, 4, 5]
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
    <input v-model="state.checkbox" aria-label="Agree" type="checkbox" />
    <output>{{ state.checkbox }}</output>
  </form>
  <form data-case="checkbox-rerender">
    <input aria-label="Agree" checked :data-round="round" type="checkbox" />
  </form>
  <form data-case="checkbox-default">
    <input aria-label="Agree" checked type="checkbox" />
  </form>
  <form data-case="checkbox-empty">
    <input aria-label="Agree" type="checkbox" />
  </form>
  <form data-case="group-bound">
    <input
      v-for="view in views"
      :key="view"
      v-model="state.group"
      :aria-label="view"
      name="view"
      type="radio"
      :value="view"
    />
    <output>{{ state.group }}</output>
  </form>
  <form data-case="group-default">
    <input aria-label="day" name="view" type="radio" value="day" />
    <input aria-label="week" checked name="view" type="radio" value="week" />
    <input aria-label="month" name="view" type="radio" value="month" />
  </form>
  <form data-case="group-empty">
    <input
      v-for="view in views"
      :key="view"
      :aria-label="view"
      name="view"
      type="radio"
      :value="view"
    />
  </form>
  <form data-case="number-default">
    <input aria-label="Quantity" type="number" value="1" />
  </form>
  <form data-case="radio-bound">
    <input
      v-model="state.radio"
      aria-label="Tea"
      name="drink"
      type="radio"
      value="tea"
    />
    <input
      v-model="state.radio"
      aria-label="Coffee"
      name="drink"
      type="radio"
      value="coffee"
    />
    <output>{{ state.radio }}</output>
  </form>
  <form data-case="radio-default">
    <input aria-label="Tea" name="drink" type="radio" value="tea" />
    <input
      aria-label="Coffee"
      checked
      name="drink"
      type="radio"
      value="coffee"
    />
  </form>
  <form data-case="radio-empty">
    <input aria-label="Tea" name="drink" type="radio" value="tea" />
    <input aria-label="Coffee" name="drink" type="radio" value="coffee" />
  </form>
  <form data-case="range-bound">
    <input v-model.number="state.range" aria-label="Level" type="range" />
    <output>{{ state.range }}</output>
  </form>
  <form data-case="range-default">
    <input aria-label="Level" type="range" value="40" />
  </form>
  <form data-case="rating-bound">
    <input
      v-for="star in stars"
      :key="star"
      v-model="state.rating"
      :aria-label="`${star} stars`"
      name="score"
      type="radio"
      :value="star"
    />
    <output>{{ state.rating }}</output>
  </form>
  <form data-case="rating-default">
    <input aria-label="0 stars" name="score" type="radio" value="0" />
    <input aria-label="1 stars" name="score" type="radio" value="1" />
    <input aria-label="2 stars" name="score" type="radio" value="2" />
    <input aria-label="3 stars" checked name="score" type="radio" value="3" />
    <input aria-label="4 stars" name="score" type="radio" value="4" />
    <input aria-label="5 stars" name="score" type="radio" value="5" />
  </form>
  <form data-case="rating-empty">
    <input
      v-for="star in stars"
      :key="star"
      :aria-label="`${star} stars`"
      name="score"
      type="radio"
      :value="star"
    />
  </form>
  <form data-case="select-bound">
    <select v-model="state.select" aria-label="Color">
      <option v-for="color in colors" :key="color" :value="color">
        {{ color }}
      </option>
    </select>
    <output>{{ state.select }}</output>
  </form>
  <form data-case="select-default">
    <select aria-label="Color">
      <option
        v-for="color in colors"
        :key="color"
        :selected="color === 'green'"
        :value="color"
      >
        {{ color }}
      </option>
    </select>
  </form>
  <form data-case="tabs-bound">
    <input
      v-for="tab in tabs"
      :key="tab"
      v-model="state.tabs"
      :aria-label="tab"
      name="tab"
      type="radio"
      :value="tab"
    />
    <output>{{ state.tabs }}</output>
  </form>
  <form data-case="tabs-default">
    <input aria-label="one" name="tab" type="radio" value="one" />
    <input aria-label="two" checked name="tab" type="radio" value="two" />
    <input aria-label="three" name="tab" type="radio" value="three" />
  </form>
  <form data-case="text-bound">
    <input v-model="state.text" aria-label="Name" />
    <output>{{ state.text }}</output>
  </form>
  <form data-case="text-rerender">
    <input aria-label="Name" :data-round="round" value="Ada" />
  </form>
  <form data-case="text-default">
    <input aria-label="Name" value="Ada" />
  </form>
  <form data-case="text-empty">
    <input aria-label="Name" />
  </form>
  <form data-case="toggle-bound">
    <input v-model="state.toggle" aria-label="Bold" type="checkbox" />
    <output>{{ state.toggle }}</output>
  </form>
  <form data-case="toggle-default">
    <input aria-label="Bold" checked type="checkbox" />
  </form>
  <form data-case="toggle-empty">
    <input aria-label="Bold" type="checkbox" />
  </form>
  <button data-rerender type="button" @click="round++">Render again</button>
</template>
