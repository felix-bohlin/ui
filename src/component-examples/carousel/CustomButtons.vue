<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"

const slides = [1, 2, 3, 4, 5]
</script>

<template>
  <Carousel
    aria-label="Destinations"
    buttons="outside"
    class="carousel-custom-buttons"
    :itemsPerView="2"
  >
    <li v-for="slide in slides" :key="slide">
      <Card style="block-size: 8rem" variant="tonal" />
    </li>
  </Carousel>
</template>

<style>
.carousel-custom-buttons {
  --_button-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14m-6-6 6 6-6 6'/%3E%3C/svg%3E");
}
</style>
