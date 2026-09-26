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
    label="Destinations"
    :per-view="3"
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
