<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
<Button
  commandfor="toast-manager"
  command="--show-toast"
  data-title="I disappear quickly"
  data-duration="1500ms"
>
  1.5s Toast
</Button>
<Button
  commandfor="toast-manager"
  command="--show-toast"
  data-title="I stay for a while"
  data-duration="10s"
>
  10s Toast
</Button>
</template>
