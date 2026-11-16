<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <TextField label="Full name" placeholder="Holly Humbucker" required />
    <TextField
      label="Email"
      placeholder="name@lowend.example"
      required
      type="email"
      variant="filled"
    />
  </div>

  <div class="example-row">
    <TextField
      endText="Whoops, this username is taken. Try another one."
      error
      label="Username"
      value="ada"
    />
    <TextField
      endText="Bummer, this code has expired."
      error
      label="Gear discount code"
      value="STRINGS23"
      variant="filled"
    />
  </div>
</template>
