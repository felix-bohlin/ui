<script setup lang="ts">
import { Rating } from "opui-css/vue"
</script>

<template>
  <Rating
    aria-describedby="stay-error"
    error
    label="Rate your stay"
    name="stay"
    required
  />
  <p class="ui-caption" id="stay-error">Pick a rating to continue.</p>
</template>
