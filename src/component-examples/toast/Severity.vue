<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
<Button
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Success!"
  data-severity="success"
  variant="filled"
  class="green"
>
  Success
</Button>
<Button
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Something went wrong"
  data-severity="critical"
  variant="filled"
  class="red"
>
  Error
</Button>
<Button
  commandfor="toast-manager"
  command="--show-toast"
  data-title="Did you know?"
  data-severity="info"
  variant="filled"
  class="blue"
>
  Info
</Button>
</template>
