<script setup lang="ts">
import { Carousel } from "opui-css/vue"

const films = [
  { id: "aqz-KE-bpKQ", title: "Big Buck Bunny" },
  { id: "eRsGyueVLvQ", title: "Sintel" },
  { id: "WhWc3b3KhnY", title: "Spring" },
  { id: "R6MlUcmOul8", title: "Tears of Steel" },
]
</script>

<template>
  <Carousel label="Films" markers>
    <li v-for="{ id, title } in films" :key="id">
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
