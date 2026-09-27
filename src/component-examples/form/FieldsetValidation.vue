<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Radio,
} from "opui-css/vue"
</script>

<template>
  <FieldSet data-invalid>
    <FieldLegend>Favorite Pet</FieldLegend>
    <FieldDescription
      >Please select your favorite type of pet.</FieldDescription
    >
    <FieldGroup name="pet-validation">
      <Radio value="dog">Dog</Radio>
      <Radio value="cat">Cat</Radio>
      <Radio value="hamster">Hamster</Radio>
    </FieldGroup>
    <span class="ui-end-text">Pick a pet to continue.</span>
  </FieldSet>
</template>
