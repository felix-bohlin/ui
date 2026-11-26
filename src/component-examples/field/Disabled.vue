<script setup lang="ts">
import { Field, SelectButton } from "opui-css/vue"
</script>

<template>
  <Field for="field-disabled-1" label="Band name">
    <input
      disabled
      id="field-disabled-1"
      name="band"
      :value.attr="'The Low Ends'"
    />
  </Field>
  <Field for="field-disabled-2" label="Instrument">
    <select disabled id="field-disabled-2" name="instrument">
      <SelectButton />
      <option>Bass</option>
      <option>Drums</option>
      <option>Guitar</option>
    </select>
  </Field>
  <Field for="field-disabled-3" label="Influences">
    <textarea disabled id="field-disabled-3" name="influences">
Funk and soul</textarea>
  </Field>
  <Field for="field-disabled-4" label="Member since">
    <input id="field-disabled-4" name="member-since" readonly value="2019" />
  </Field>
</template>
