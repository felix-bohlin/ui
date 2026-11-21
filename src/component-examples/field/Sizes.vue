<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <Field for="field-sizes-1" label="X-small" size="x-small">
    <input id="field-sizes-1" placeholder="Your name" />
  </Field>
  <Field for="field-sizes-2" label="Small" size="small">
    <input id="field-sizes-2" placeholder="Your name" />
  </Field>
  <Field for="field-sizes-3" label="Medium">
    <input id="field-sizes-3" placeholder="Your name" />
  </Field>
  <Field for="field-sizes-4" label="Large" size="large">
    <input id="field-sizes-4" placeholder="Your name" />
  </Field>
</template>
