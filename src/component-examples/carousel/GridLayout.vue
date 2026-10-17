<script setup lang="ts">
import { Card, CardHeader, Carousel } from "opui-css/vue"

const places = ["Kyoto", "Lima", "Lisbon"]
</script>

<template>
  <div
    style="
      display: grid;
      gap: var(--size-4);
      grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    "
  >
    <div>
      <Carousel aria-label="Destinations" markers>
        <li v-for="title in places" :key="title">
          <Card variant="tonal">
            <CardHeader>
              <p>Destination</p>
              <h3>{{ title }}</h3>
            </CardHeader>
          </Card>
        </li>
      </Carousel>
    </div>
    <hgroup>
      <h3>Spring trips</h3>
      <p>Three cities, two weeks, one carry-on.</p>
    </hgroup>
  </div>
</template>
