<script setup lang="ts">
import { FieldDescription, FieldGroup, FieldLegend, FieldSet, Textarea, TextField } from "opui-css/vue"
</script>

<template>
<FieldSet>
  <FieldLegend>Pet info</FieldLegend>
  <FieldDescription>We must know your pet's information.</FieldDescription>
  <FieldGroup name="bio">
    <TextField label="Name" />
    <Textarea required label="Life story" />
  </FieldGroup>
</FieldSet>
</template>
