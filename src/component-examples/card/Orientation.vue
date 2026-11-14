<script setup lang="ts">
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "opui-css/vue"
</script>

<template>
  <Card variant="outlined">
    <img
      alt="A deep blue fjord between steep mountains"
      height="450"
      loading="lazy"
      src="https://picsum.photos/id/1015/800/450"
      width="800"
    />
    <CardHeader>
      <p>Norway</p>
      <h3>Fjord cruise from Bergen</h3>
      <p>Three nights, from 6 June</p>
    </CardHeader>
    <CardContent>
      Sail the Sognefjord with stops in Flåm and Balestrand. Cabins have a
      window on the water.
    </CardContent>
    <CardActions>
      <Button variant="filled">Book</Button>
    </CardActions>
  </Card>

  <Card orientation="vertical" variant="outlined">
    <img
      alt="Green cliffs and a winding road under a cloudy sky"
      height="450"
      loading="lazy"
      src="https://picsum.photos/id/1018/800/450"
      style="aspect-ratio: 3 / 1"
      width="800"
    />
    <CardHeader>
      <p>Norway</p>
      <h3>Lofoten by bike</h3>
    </CardHeader>
    <CardContent>
      Six days from Å to Svolvær, with your luggage sent ahead.
    </CardContent>
  </Card>

  <Card
    orientation="horizontal"
    style="max-inline-size: 24rem"
    variant="outlined"
  >
    <img
      alt="Yellow tents in a snowy mountain camp"
      height="450"
      loading="lazy"
      src="https://picsum.photos/id/1036/800/450"
      width="800"
    />
    <CardHeader>
      <p>Field notes</p>
      <h3>A week in the mountains</h3>
    </CardHeader>
  </Card>
</template>
