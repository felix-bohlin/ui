<script setup lang="ts">
import { Button, Card, CardActions, CardHeader, Carousel } from "opui-css/vue"

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
  <Carousel aria-label="Plans" buttons="outside" :itemsPerView="2">
    <li v-for="{ action, description, title } in plans" :key="title">
      <Card variant="outlined">
        <CardHeader>
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </CardHeader>
        <CardActions>
          <Button variant="filled">{{ action }}</Button>
        </CardActions>
      </Card>
    </li>
  </Carousel>
</template>
