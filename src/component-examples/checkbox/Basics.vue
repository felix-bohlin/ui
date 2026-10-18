<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox checked name="checkbox-basics" hideLabel>Checked</Checkbox>
  <Checkbox name="checkbox-basics" hideLabel>Unchecked</Checkbox>
  <Checkbox indeterminate name="checkbox-basics" hideLabel
    >Indeterminate</Checkbox
  >
  <Checkbox disabled name="checkbox-basics" hideLabel>Disabled</Checkbox>
  <Checkbox checked disabled name="checkbox-basics" hideLabel
    >Checked and disabled</Checkbox
  >
</template>
