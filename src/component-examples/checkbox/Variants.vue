<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox checked name="checkbox" hideLabel>Checked</Checkbox>
  <Checkbox name="checkbox" hideLabel>Unchecked</Checkbox>
  <Checkbox indeterminate name="checkbox" hideLabel>Indeterminate</Checkbox>
  <Checkbox disabled name="checkbox" hideLabel>Disabled</Checkbox>
  <Checkbox checked disabled name="checkbox" hideLabel
    >Checked and disabled</Checkbox
  >
</template>
