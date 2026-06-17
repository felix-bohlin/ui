<script setup lang="ts">
import { onMounted } from "vue"
import { Button } from "opui-css/vue"

onMounted(() => {
  function setupToastDemo() {
    const btn = document.getElementById("js-trigger")
    if (btn) {
      btn.addEventListener("click", () => {
        if (window.showToast) {
          window.showToast({
            title: "Triggered from JS!",
            description: "With an optional description",
            severity: "success",
            duration: "3000ms",
          })
        }
      })
    }
  }

  setupToastDemo()
})
</script>

<template>
  <Button id="js-trigger">Trigger from JS</Button>
</template>
