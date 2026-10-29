<script setup lang="ts">
import { Button, Copy, TextField } from "opui-css/vue"
</script>

<template>
  <Copy id="copy-basics-1">
    <TextField
      hideLabel
      label="Invite link"
      readonly
      value="https://example.com/invite/8f3k2"
    />
  </Copy>
  <Button command="--copy" commandfor="copy-basics-1" variant="outlined"
    >Copy</Button
  >
</template>
