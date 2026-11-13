<script setup lang="ts">
import { Rating } from "opui-css/vue"

const starLabel = {
  few: "{count} نجوم",
  one: "نجمة واحدة",
  other: "{count} نجمة",
  two: "نجمتان",
}
</script>

<template>
  <div class="ui-layout-column" dir="rtl" lang="ar">
    <Rating label="التقييم 3.5 من 5" :value="3.5" />
    <Rating
      clearLabel="بدون تقييم"
      label="قيّم المنتج"
      lang="ar"
      name="rating-ar"
      :starLabel="starLabel"
      :value="4"
    />
  </div>
</template>
