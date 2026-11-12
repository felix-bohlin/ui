<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <TextField label="Full name" placeholder="Hakki Hälinen" required />
    <TextField
      label="Email"
      placeholder="name@example.com"
      required
      type="email"
      variant="filled"
    />
  </div>

  <div class="example-row">
    <TextField
      endText="This username is taken. Try another one."
      error
      label="Username"
      value="ada"
    />
    <TextField
      endText="This code has expired."
      error
      label="Discount code"
      value="SPRING23"
      variant="filled"
    />
  </div>
</template>
