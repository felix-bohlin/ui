<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import { Progress } from "opui-css/vue"

const value = ref(10)
let interval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  interval = setInterval(() => {
    value.value = value.value >= 100 ? 10 : value.value + 10
  }, 3000)
})

onBeforeUnmount(() => clearInterval(interval))
</script>

<template>
  <Progress id="determinate-progress" max="100" :value="value" />
</template>
