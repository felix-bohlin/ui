<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox name="checkbox">
    Default
    <template #end-text>Supporting text</template>
  </Checkbox>
  <Checkbox stack name="checkbox">
    Stack
    <template #end-text>Supporting text</template>
  </Checkbox>
</template>
