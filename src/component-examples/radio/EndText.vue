<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <Radio name="radio-end-text" value="default" checked>
    Default
    <template #end-text>Supporting text</template>
  </Radio>
  <Radio name="radio-end-text" value="stack" stack>
    Stack
    <template #end-text>Supporting text</template>
  </Radio>
</template>
