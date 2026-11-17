<script setup lang="ts">
import { ref } from "vue"
import { Button, FieldGroup, FieldLegend, Fieldset, Radio } from "opui-css/vue"

const plan = ref("basic")

function reset() {
  plan.value = "basic"
}
</script>

<template>
  <Fieldset>
    <FieldLegend>Plan</FieldLegend>
    <FieldGroup name="radio-binding">
      <Radio v-model="plan" value="basic">Basic</Radio>
      <Radio v-model="plan" value="gold">Gold</Radio>
      <Radio v-model="plan" value="platinum">Platinum</Radio>
    </FieldGroup>
  </Fieldset>
  <p class="radio-binding-text">Selected: {{ plan }}</p>
  <Button class="radio-binding-reset" @click="reset">Reset</Button>
</template>
