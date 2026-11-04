<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea
    characterCount
    characterCountLabel="{count} characters to go"
    endText="Shown on your profile."
    label="Bio"
    :maxlength="160"
  />
</template>
