<script setup lang="ts">
import { Button, Toaster } from "opui-css/vue"
</script>

<template>
  <Button
    command="--toast"
    commandfor="toast-severities-1"
    data-toast="Draft saved"
    variant="outlined"
    >Default</Button
  >
  <Button
    command="--toast"
    commandfor="toast-severities-1"
    data-toast="A new version is available"
    data-toast-severity="info"
    variant="outlined"
    >Info</Button
  >
  <Button
    command="--toast"
    commandfor="toast-severities-1"
    data-toast="Changes saved"
    data-toast-severity="success"
    variant="outlined"
    >Success</Button
  >
  <Button
    command="--toast"
    commandfor="toast-severities-1"
    data-toast="Your trial ends in 3 days"
    data-toast-severity="warning"
    variant="outlined"
    >Warning</Button
  >
  <Button
    command="--toast"
    commandfor="toast-severities-1"
    data-toast="Couldn't save your changes"
    data-toast-severity="critical"
    variant="outlined"
    >Critical</Button
  >
  <Toaster id="toast-severities-1" />
</template>
