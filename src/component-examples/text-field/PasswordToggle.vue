<script setup lang="ts">
import { Field, PasswordToggle } from "opui-css/vue"
</script>

<template>
  <Field for="text-field-password-toggle-1" label="Password">
    <input
      autocomplete="current-password"
      id="text-field-password-toggle-1"
      type="password"
    />
    <template #end>
      <PasswordToggle for="text-field-password-toggle-1" />
    </template>
  </Field>
  <Field
    endText="At least 12 characters."
    for="text-field-password-toggle-2"
    label="New password"
  >
    <input
      aria-describedby="text-field-password-toggle-2-end-text"
      autocomplete="new-password"
      id="text-field-password-toggle-2"
      minlength="12"
      type="password"
    />
    <template #end>
      <PasswordToggle
        for="text-field-password-toggle-2"
        label="Show new password"
      />
    </template>
  </Field>
</template>
