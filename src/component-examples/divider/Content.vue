<script setup lang="ts">
import { Button, Divider } from "opui-css/vue"
</script>

<template>
  <Divider>or continue with email</Divider>

  <Divider align="start">Billing</Divider>

  <Divider align="end" variant="primary">Today</Divider>

  <Divider>
    <Button rounded size="small" variant="outlined"
      >Show 12 more replies</Button
    >
  </Divider>
</template>
