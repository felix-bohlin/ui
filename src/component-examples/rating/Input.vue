<script setup lang="ts">
import { ref } from "vue"
import { Rating } from "opui-css/vue"

const rating = ref(3)
</script>

<template>
  <Rating v-model="rating" label="Your rating" name="review" />
</template>
