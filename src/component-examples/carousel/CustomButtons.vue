<script setup lang="ts">
import { Card, Carousel } from "opui-css/vue"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Ceviche by the Pacific.", title: "Lima" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
</script>

<template>
  <Carousel
    buttons="outside"
    class="carousel-custom-buttons"
    label="Destinations"
    :per-view="2"
  >
    <li v-for="{ description, title } in places" :key="title">
      <Card variant="tonal">
        <template #header>
          <p>Destination</p>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </template>
      </Card>
    </li>
  </Carousel>
</template>

<style>
.carousel-custom-buttons {
  --_button-bg-color: var(--primary);
  --_button-next-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M8.293 4.293a1 1 0 0 0 0 1.414L14.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0'/%3E%3C/svg%3E");
  --_button-prev-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0'/%3E%3C/svg%3E");
}
</style>
