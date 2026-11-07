<script setup lang="ts">
import { Rating } from "opui-css/vue"
</script>

<template>
  <Rating
    aria-describedby="rating-validation-1"
    error
    label="Rate your stay"
    name="stay"
    required
  />
  <p class="ui-caption" id="rating-validation-1">Pick a rating to continue.</p>
</template>
