<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <Radio checked name="radio-visible-label" value="a">Choice A</Radio>
  <Radio disabled name="radio-visible-label" value="b">Disabled</Radio>
  <Radio name="radio-visible-label" value="c">
    Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
    semiotics artisan synth stumptown gastropub cornhole
    <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
  </Radio>
</template>
