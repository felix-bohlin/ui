<script setup lang="ts">
import { Button, Copy, Field } from "opui-css/vue"
</script>

<template>
  <Copy id="copy-basics-1">
    <Field for="copy-basics-2" hideLabel label="Invite link">
      <input
        id="copy-basics-2"
        readonly
        value="https://example.com/invite/8f3k2"
      />
    </Field>
  </Copy>
  <Button command="--copy" commandfor="copy-basics-1" variant="outlined"
    >Copy</Button
  >
</template>
