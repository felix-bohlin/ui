<script setup vapor lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox class="anatomy" checked>
    Label
    <template #end-text>End text</template>
  </Checkbox>
</template>
