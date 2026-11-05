<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField accept="image/*" label="Avatar" type="file" />
  <TextField label="Attachments" type="file" variant="filled" />
</template>
