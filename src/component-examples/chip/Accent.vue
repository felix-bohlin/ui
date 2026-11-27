<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip color="accent" label="Bassbook Gold" />
  <Chip
    class="ui-scope"
    color="accent"
    label="Funk"
    style="--ui-palette-hue: 300"
  />
  <Chip
    class="ui-scope"
    color="accent"
    label="Fretless"
    style="--ui-palette-hue: 190"
  />
  <Chip
    class="ui-scope"
    color="accent"
    label="Slap"
    style="--ui-palette-hue: 45"
  />
</template>
