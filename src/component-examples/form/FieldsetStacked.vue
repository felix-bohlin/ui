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
  <FieldSet>
    <FieldLegend>Favorite Pet</FieldLegend>
    <FieldDescription
      >Please select your favorite type of pet.</FieldDescription
    >
    <FieldGroup name="pet">
      <Radio value="dog">Dog</Radio>
      <Radio value="cat">Cat</Radio>
      <Radio value="hamster">Hamster</Radio>
    </FieldGroup>
  </FieldSet>
</template>
