<script setup lang="ts">
import { Carousel } from "opui-css/vue"

const photos = [
  { alt: "A deep blue fjord between steep mountains", id: 1015 },
  { alt: "Red rock cliffs lit by the setting sun", id: 1016 },
  { alt: "Green cliffs and a winding road under a cloudy sky", id: 1018 },
  { alt: "Yellow tents in a snowy mountain camp", id: 1036 },
  { alt: "A waterfall in a green forest valley", id: 1039 },
]
</script>

<template>
  <Carousel label="Gallery" :per-view="3" style="--_media-aspect-ratio: 1">
    <li v-for="{ alt, id } in photos" :key="id">
      <img
        :alt="alt"
        height="400"
        loading="lazy"
        :src="`https://picsum.photos/id/${id}/400/400`"
        width="400"
      />
    </li>
  </Carousel>
</template>
