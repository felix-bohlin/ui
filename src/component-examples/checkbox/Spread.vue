<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox name="checkbox-spread" spread>
    Accept Terms & Conditions
    <template #end-text>I have read and agree to the privacy policy.</template>
  </Checkbox>

  <Checkbox name="checkbox-spread" required spread>
    Required
    <template #end-text>You must accept this to continue.</template>
  </Checkbox>

  <Checkbox disabled name="checkbox-spread" spread>
    Disabled
    <template #end-text>This checkbox is disabled.</template>
  </Checkbox>

  <Checkbox error name="checkbox-spread" spread>
    Invalid Checkbox
    <template #end-text>Check this box to continue.</template>
  </Checkbox>
</template>
