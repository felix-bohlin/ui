<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>

<template>
<Form>
  <FieldSet>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup direction="row" name="fieldset-required-1-astro">
      <Radio required>Radio 1</Radio>
      <Radio required>Radio 2</Radio>
      <Radio required>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>
</Form>
</template>
