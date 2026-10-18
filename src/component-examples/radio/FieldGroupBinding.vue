<script setup lang="ts">
import { ref } from "vue"
import { Button, FieldGroup, FieldLegend, FieldSet, Radio } from "opui-css/vue"

const plan = ref("free")

function reset() {
  plan.value = "free"
}
</script>

<template>
  <FieldSet>
    <FieldLegend>Plan</FieldLegend>
    <FieldGroup name="radio-binding">
      <Radio v-model="plan" value="free">Free</Radio>
      <Radio v-model="plan" value="pro">Pro</Radio>
      <Radio v-model="plan" value="team">Team</Radio>
    </FieldGroup>
  </FieldSet>
  <p class="radio-binding-text">Selected: {{ plan }}</p>
  <Button class="radio-binding-reset" @click="reset">Reset</Button>
</template>
