<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"

const slides = [1, 2, 3, 4, 5]
</script>

<template>
  <Carousel
    aria-label="Destinations"
    :itemsPerView="2"
    markers
    orientation="vertical"
    stretch
    style="--_block-size: 16rem"
  >
    <li v-for="slide in slides" :key="slide">
      <Card variant="tonal" />
    </li>
  </Carousel>
</template>
