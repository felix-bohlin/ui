<script setup lang="ts">
import { Card, CardHeader, Carousel } from "opui-css/vue"

const places = [
  { description: "Temples, gardens and quiet lanes.", title: "Kyoto" },
  { description: "Tiles, trams and custard tarts.", title: "Lisbon" },
  { description: "Fjords, saunas and modern architecture.", title: "Oslo" },
  { description: "Medina markets and Mediterranean light.", title: "Tunis" },
]
</script>

<template>
  <Carousel
    aria-label="Destinations"
    buttons="outside"
    :perView="2"
    persistentButtons
  >
    <li v-for="{ description, title } in places" :key="title">
      <Card variant="tonal">
        <CardHeader>
          <p>Destination</p>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </CardHeader>
      </Card>
    </li>
  </Carousel>
</template>
