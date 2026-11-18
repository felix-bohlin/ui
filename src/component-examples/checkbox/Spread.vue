<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox name="checkbox-spread" spread value="gift-wrap">
    Gift wrap
    <template #end-text>Wrapped in recycled paper for €3.</template>
  </Checkbox>

  <Checkbox name="checkbox-spread" required spread value="terms">
    I accept the terms of sale
    <template #end-text>Required to place the order.</template>
  </Checkbox>

  <Checkbox disabled name="checkbox-spread" spread value="express">
    Express delivery
    <template #end-text>Not available for your address.</template>
  </Checkbox>

  <Checkbox error name="checkbox-spread" spread value="age">
    I'm 18 or older
    <template #end-text>Confirm your age to buy this item.</template>
  </Checkbox>
</template>
