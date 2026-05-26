<script setup lang="ts">
import { Checkbox, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "opui-css/vue"
</script>

<template>
<FieldSet disabled>
  <FieldLegend>Pet dating</FieldLegend>
  <FieldDescription>You can't change these settings</FieldDescription>
  <FieldGroup name="notifications">
    <Checkbox value="horse-tinder" checked>Horse Tinder</Checkbox>
    <Checkbox value="onlyhorsefans" checked>OnlyHorseFans</Checkbox>
  </FieldGroup>
</FieldSet>
</template>
