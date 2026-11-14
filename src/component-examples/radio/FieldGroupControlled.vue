<script setup lang="ts">
import { ref } from "vue"
import { Button, FieldGroup, FieldLegend, Fieldset, Radio } from "opui-css/vue"

const shipping = ref("standard")
</script>

<template>
  <Fieldset>
    <FieldLegend>Shipping</FieldLegend>
    <FieldGroup name="radio-controlled">
      <Radio
        :checked="shipping === 'standard'"
        value="standard"
        @change="shipping = 'standard'"
      >
        Standard
      </Radio>
      <Radio
        :checked="shipping === 'express'"
        value="express"
        @change="shipping = 'express'"
      >
        Express
      </Radio>
      <Radio
        :checked="shipping === 'pickup'"
        value="pickup"
        @change="shipping = 'pickup'"
      >
        Pickup
      </Radio>
    </FieldGroup>
  </Fieldset>
  <p class="radio-controlled-text">Selected: {{ shipping }}</p>
  <Button class="radio-controlled-reset" @click="shipping = 'standard'">
    Reset
  </Button>
</template>
