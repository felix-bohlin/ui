<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
<Button
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Title only"
>
  Title only
</Button>
<Button
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Title with description"
  data-description="This is additional context information"
>
  Title + description
</Button>
</template>
