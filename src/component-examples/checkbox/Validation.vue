<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <div class="example-row ui-spacious">
    <Checkbox required name="checkbox-validation">Default</Checkbox>
    <Checkbox stack required name="checkbox-validation">Stack</Checkbox>
  </div>
  <div class="example-row ui-spacious">
    <Checkbox error checked name="checkbox-validation">
      Default
      <template #end-text>Check yourself</template>
    </Checkbox>
    <Checkbox stack error name="checkbox-validation">
      Stack
      <template #end-text>Before you wreck yourself</template>
    </Checkbox>
  </div>
</template>
