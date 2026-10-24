<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Checkbox required name="checkbox-validation">Default</Checkbox>
    <Checkbox orientation="vertical" required name="checkbox-validation"
      >Stack</Checkbox
    >
  </div>
  <div class="example-row">
    <Checkbox error checked name="checkbox-validation">
      Default
      <template #end-text>Check yourself</template>
    </Checkbox>
    <Checkbox orientation="vertical" error name="checkbox-validation">
      Stack
      <template #end-text>Before you wreck yourself</template>
    </Checkbox>
  </div>
</template>
