<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip as="button" variant="tonal" label="Tonal" disabled />
  <Chip as="button" variant="outlined" label="Outlined" disabled />
  <Chip disabled href="#" label="Tonal link" />
  <Chip class="ui-disabled" label="Archived" />
</template>
