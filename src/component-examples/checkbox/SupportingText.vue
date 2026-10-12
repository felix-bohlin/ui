<script setup lang="ts">
import {
  Checkbox,
  CheckboxEndText,
  CheckboxInput,
  CheckboxLabel,
} from "opui-css/vue"
</script>

<template>
  <Checkbox>
    <CheckboxInput name="checkbox-supporting-text" />
    <CheckboxLabel>Default</CheckboxLabel>
    <CheckboxEndText>Supporting text</CheckboxEndText>
  </Checkbox>
  <Checkbox stack>
    <CheckboxInput name="checkbox-supporting-text" />
    <CheckboxLabel>Stack</CheckboxLabel>
    <CheckboxEndText>Supporting text</CheckboxEndText>
  </Checkbox>
</template>
