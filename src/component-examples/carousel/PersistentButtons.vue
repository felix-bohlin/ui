<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"

const slides = [1, 2, 3, 4]
</script>

<template>
  <Carousel
    aria-label="Destinations"
    buttons="outside"
    :itemsPerView="2"
    persistentButtons
  >
    <li v-for="slide in slides" :key="slide">
      <Card style="block-size: 8rem" variant="tonal" />
    </li>
  </Carousel>
</template>
