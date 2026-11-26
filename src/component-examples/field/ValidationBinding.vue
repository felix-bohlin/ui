<script setup lang="ts">
import { computed, ref } from "vue"
import { Field } from "opui-css/vue"

const username = ref("scott")
const invalid = computed(() => /[^a-z0-9]/i.test(username.value))
</script>

<template>
  <Field
    :end-text="
      invalid
        ? 'Use only letters and numbers.'
        : 'Letters and numbers, shown on your profile.'
    "
    for="field-validation-binding-1"
    label="Username"
  >
    <input
      aria-describedby="field-validation-binding-1-end-text"
      :aria-invalid="invalid ? 'true' : undefined"
      id="field-validation-binding-1"
      name="field-validation-binding"
      v-model="username"
    />
  </Field>
</template>
