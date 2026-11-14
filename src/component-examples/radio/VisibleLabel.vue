<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <Radio checked name="radio-visible-label" value="monthly"
    >Monthly newsletter</Radio
  >
  <Radio disabled name="radio-visible-label" value="weekly"
    >Weekly digest</Radio
  >
  <Radio name="radio-visible-label" value="updates">
    Bassbook news only, a few times a year when we add something totally rad.
    You can unsubscribe at any time, as described in our
    <a class="ui-link" href="#visible-label">privacy policy</a>.
  </Radio>
</template>
