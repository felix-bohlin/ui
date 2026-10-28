<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode label="PIN" :length="4" name="pin" />
  <OneTimeCode label="Backup code" grouped :length="8" name="backup-code" />
</template>
