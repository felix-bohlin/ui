<script setup lang="ts">
import { Field } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Field for="field-validation-1" label="Full name">
      <input id="field-validation-1" placeholder="Scott Humbucker" required />
    </Field>
    <Field for="field-validation-2" label="Email" variant="filled">
      <input
        id="field-validation-2"
        placeholder="name@bassmail.example"
        required
        type="email"
      />
    </Field>
  </div>

  <div class="example-row">
    <Field
      endText="Whoops, this username is taken. Try another one."
      for="field-validation-3"
      label="Username"
    >
      <input
        aria-describedby="field-validation-3-end-text"
        aria-invalid="true"
        id="field-validation-3"
        :value.attr="'ada'"
      />
    </Field>
    <Field
      endText="Bummer, this code has expired."
      for="field-validation-4"
      label="Gear discount code"
      variant="filled"
    >
      <input
        aria-describedby="field-validation-4-end-text"
        aria-invalid="true"
        id="field-validation-4"
        :value.attr="'STRINGS23'"
      />
    </Field>
  </div>
</template>
