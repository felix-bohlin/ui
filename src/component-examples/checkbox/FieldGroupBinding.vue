<script setup lang="ts">
import { ref } from "vue"
import {
  Button,
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
} from "opui-css/vue"

const fruit = ref(["apples"])

function reset() {
  fruit.value = ["apples"]
}
</script>

<template>
  <Fieldset>
    <FieldLegend>Fruit</FieldLegend>
    <FieldGroup name="checkbox-binding">
      <Checkbox v-model="fruit" value="apples">Apples</Checkbox>
      <Checkbox v-model="fruit" value="bananas">Bananas</Checkbox>
      <Checkbox v-model="fruit" value="cherries">Cherries</Checkbox>
    </FieldGroup>
  </Fieldset>
  <p class="checkbox-binding-text">
    Selected: {{ fruit.join(", ") || "none" }}
  </p>
  <Button class="checkbox-binding-reset" @click="reset">Reset</Button>
</template>
