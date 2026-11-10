<script setup lang="ts">
import { computed, ref } from "vue"
import {
  Button,
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
} from "opui-css/vue"

const topics = ["updates", "events", "offers"]

const selected = ref(["updates"])
const summary = computed(
  () =>
    topics.filter((topic) => selected.value.includes(topic)).join(", ") ||
    "none",
)

function reset() {
  selected.value = ["updates"]
}
</script>

<template>
  <Fieldset>
    <FieldLegend>Newsletter topics</FieldLegend>
    <FieldGroup name="checkbox-binding">
      <Checkbox v-model="selected" value="updates">Product updates</Checkbox>
      <Checkbox v-model="selected" value="events">Events</Checkbox>
      <Checkbox v-model="selected" value="offers">Offers</Checkbox>
    </FieldGroup>
  </Fieldset>
  <p class="checkbox-binding-text">Selected: {{ summary }}</p>
  <Button class="checkbox-binding-reset" @click="reset">Reset</Button>
</template>
