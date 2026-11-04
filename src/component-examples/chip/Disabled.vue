<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip as="button" disabled label="Tonal" variant="tonal" />
  <Chip as="button" disabled label="Outlined" variant="outlined" />
  <Chip disabled href="#" label="Tonal link" />
  <Chip class="ui-disabled" label="Archived" />
</template>
