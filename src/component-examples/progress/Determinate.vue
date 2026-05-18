<script setup lang="ts">
import { onMounted } from "vue"
import { Progress } from "opui-css/vue"

onMounted(() => {
  const progress = document.querySelector(
      "#determinate-progress",
    )
    if (progress) {
      setInterval(() => {
        if (progress.value >= 100) {
          progress.value = 10
        } else {
          progress.value += 10
        }
      }, 3000)
    }
})
</script>

<template>
<Progress id="determinate-progress" max="100" value="10" />
</template>
