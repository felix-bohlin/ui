<script setup lang="ts">
import { ref } from "vue"
import { Button, FieldGroup, FieldLegend, Fieldset, Radio } from "opui-css/vue"

const plan = ref("starter")

function reset() {
  plan.value = "starter"
}
</script>

<template>
  <Fieldset>
    <FieldLegend>Plan</FieldLegend>
    <FieldGroup name="radio-binding">
      <Radio v-model="plan" value="starter">Starter</Radio>
      <Radio v-model="plan" value="team">Team</Radio>
      <Radio v-model="plan" value="business">Business</Radio>
    </FieldGroup>
  </Fieldset>
  <p class="radio-binding-text">Selected: {{ plan }}</p>
  <Button class="radio-binding-reset" @click="reset">Reset</Button>
</template>
