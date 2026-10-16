<script setup lang="ts">
import { Stepper } from "opui-css/vue"
</script>

<template>
  <Stepper
    :current="1"
    dir="rtl"
    :items="[{ label: 'السلة' }, { label: 'الشحن' }, { label: 'الدفع' }]"
    label="خطوات الدفع"
    lang="ar"
  />
</template>

<style>
.ui-stepper:lang(ar) {
  --_completed-label: "مكتمل: ";
}
</style>
