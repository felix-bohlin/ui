<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>

<template>
  <Textarea
    characterCount
    characterCountLabel="{count} characters to go"
    endText="Up to 160 characters, shown on your profile."
    label="Bio"
    :maxlength="160"
  />
</template>
