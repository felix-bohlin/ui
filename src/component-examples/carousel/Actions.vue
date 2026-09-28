<script setup lang="ts">
import { Button, Card, Carousel } from "opui-css/vue"

const plans = [
  {
    action: "Choose Basic",
    description: "For personal projects.",
    title: "Basic",
  },
  {
    action: "Contact sales",
    description: "For large organisations.",
    title: "Enterprise",
  },
  { action: "Choose Pro", description: "For growing teams.", title: "Pro" },
  { action: "Choose Team", description: "For small teams.", title: "Team" },
]
</script>

<template>
  <Carousel buttons="outside" label="Plans" :per-view="2">
    <li v-for="{ action, description, title } in plans" :key="title">
      <Card variant="outlined">
        <template #header>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </template>
        <template #actions>
          <Button variant="filled">{{ action }}</Button>
        </template>
      </Card>
    </li>
  </Carousel>
</template>
