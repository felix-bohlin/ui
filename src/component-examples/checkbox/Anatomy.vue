<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox name="checkbox-anatomy" class="anatomy" checked>
    Label
    <template #end-text>End text</template>
  </Checkbox>
</template>
