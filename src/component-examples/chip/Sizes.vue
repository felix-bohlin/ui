<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
<Chip size="small" label="Small" />
<Chip label="Default" />
<Chip
  multiline
  style="max-width: 30ch;"
  label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales."
/>
</template>
