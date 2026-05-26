<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
<Checkbox spread>
  Accept Terms & Conditions
  <template #end-text>I have read and agree to the privacy policy.</template>
</Checkbox>

<Checkbox spread required>
  Required
  <template #end-text>You must accept this to continue.</template>
</Checkbox>

<Checkbox spread disabled>
  Disabled
  <template #end-text>This checkbox is disabled.</template>
</Checkbox>

<Checkbox spread critical>
  Invalid Checkbox
  <template #end-text>There is an error with this checkbox.</template>
</Checkbox>
</template>
