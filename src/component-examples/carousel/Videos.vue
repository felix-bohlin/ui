<script setup lang="ts">
import { Carousel } from "opui-css/vue"

const videos = [
  { label: "A red flower bud opening", name: "flower" },
  { label: "Scene from a black-and-white film", name: "friday" },
]
</script>

<template>
  <Carousel label="Videos" markers>
    <li v-for="{ label, name } in videos" :key="name">
      <video
        :aria-label="label"
        controls
        playsinline
        preload="metadata"
        :src="`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/${name}.mp4`"
      ></video>
    </li>
  </Carousel>
</template>
