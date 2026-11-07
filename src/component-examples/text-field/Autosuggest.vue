<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField
    label="Users"
    list="text-field-autosuggest-1-list"
    placeholder="Placeholder"
  >
    <datalist id="text-field-autosuggest-1-list">
      <option value="Jonny Greenwood"></option>
      <option value="Marika Hackman"></option>
      <option value="Ray Manzarek"></option>
    </datalist>
  </TextField>

  <TextField
    label="Emails"
    list="text-field-autosuggest-2-list"
    placeholder="Placeholder"
    type="email"
    variant="filled"
  >
    <datalist id="text-field-autosuggest-2-list">
      <option value="jonny.greenwood@radio.head"></option>
      <option value="marika@hack.man"></option>
      <option value="ray.manzarek@the.doors"></option>
    </datalist>
  </TextField>
</template>
