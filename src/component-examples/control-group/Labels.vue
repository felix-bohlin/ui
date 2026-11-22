<script setup lang="ts">
import { Button, ControlGroup, Field } from "opui-css/vue"
</script>

<template>
  <ControlGroup aria-label="Discount" variant="outlined">
    <Field for="control-group-labels-2" label="Discount code">
      <input
        aria-describedby="control-group-labels-1"
        id="control-group-labels-2"
        name="discount"
        :value.attr="'SPRING10'"
      />
    </Field>
    <Button>Apply</Button>
  </ControlGroup>
  <p id="control-group-labels-1">One code per order.</p>
</template>
