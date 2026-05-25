<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
<TextField label="Users" list="users" placeholder="Placeholder">
  <datalist id="users">
    <option value="Ray Manzarek"></option>
    <option value="Jonny Greenwood"></option>
    <option value="Marika Hackman"></option>
  </datalist>
</TextField>

<TextField
  filled
  label="Emails"
  list="users-email"
  placeholder="Placeholder"
  type="email"
>
  <datalist id="users-email">
    <option value="ray.manzarek@the.doors"></option>
    <option value="jonny.greenwood@radio.head"></option>
    <option value="marika@hack.man"></option>
  </datalist>
</TextField>
</template>
