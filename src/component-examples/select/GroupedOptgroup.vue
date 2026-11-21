<script setup lang="ts">
import { Field, SelectButton } from "opui-css/vue"
</script>

<template>
  <Field for="select-grouped-optgroup-1" label="Car">
    <select id="select-grouped-optgroup-1">
      <SelectButton />
      <option value="">Select car</option>
      <optgroup label="French cars">
        <legend>French cars</legend>
        <option>Citroën</option>
        <option>Renault</option>
      </optgroup>
      <optgroup label="Swedish cars">
        <legend>Swedish cars</legend>
        <option>Saab</option>
        <option>Volvo</option>
      </optgroup>
    </select>
  </Field>
</template>
