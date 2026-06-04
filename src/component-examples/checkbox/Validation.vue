<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <div class="example-row ui-spacious">
    <Checkbox required name="checkbox">Default</Checkbox>
    <Checkbox stack required name="checkbox">Stack</Checkbox>
  </div>
  <div class="example-row ui-spacious">
    <Checkbox error checked name="checkbox">
      Default
      <template #end-text>Check yourself</template>
    </Checkbox>
    <Checkbox stack error name="checkbox">
      Stack
      <template #end-text>Before you wreck yourself</template>
    </Checkbox>
  </div>
</template>
