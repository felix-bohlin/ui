<script setup lang="ts">
import { Button } from "opui-css/vue"
import { toast } from "opui-css/toast"
</script>

<template>
  <Button @click="toast('Profile saved', { severity: 'success' })">
    Save profile
  </Button>
</template>
