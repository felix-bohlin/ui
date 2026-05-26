<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
<TextField label="Username" placeholder="Enter your name">
  <template #header>Full Name</template>
</TextField>

<TextField label="Tagline" placeholder="A short description">
  <template #footer>0 / 80</template>
</TextField>
</template>
