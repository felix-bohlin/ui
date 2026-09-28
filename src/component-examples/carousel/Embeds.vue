<script setup lang="ts">
import { Carousel } from "opui-css/vue"

const tutorials = [
  { id: "gmI5nvzv170", title: "CSS only carousel? Learn ::scroll-button() in 9 minutes" },
  { id: "bP8mrNdR-hs", title: "I love the new CSS functions" },
  { id: "qu1jE41O_8o", title: "Use these CSS features instead of JavaScript" },
]
</script>

<template>
  <Carousel label="Tutorials" markers>
    <li v-for="{ id, title } in tutorials" :key="id">
      <iframe
        allow="encrypted-media; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        :src="`https://www.youtube-nocookie.com/embed/${id}`"
        :title="title"
      ></iframe>
    </li>
  </Carousel>
</template>
