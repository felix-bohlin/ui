<script setup lang="ts">
import { Rating } from "opui-css/vue"

const starLabel = (value: number) =>
  value === 1 ? "نجمة واحدة" : value === 2 ? "نجمتان" : `${value} نجوم`
</script>

<template>
  <div class="example-column" dir="rtl" lang="ar">
    <Rating label="التقييم 3.5 من 5" :value="3.5" />
    <Rating
      clearLabel="بدون تقييم"
      label="قيّم المنتج"
      name="rating-ar"
      :starLabel="starLabel"
      :value="4"
    />
  </div>
</template>
