<script setup lang="ts">
import { Field, SelectButton } from "opui-css/vue"
</script>

<template>
  <Field for="select-grouped-1" label="Car">
    <select id="select-grouped-1">
      <SelectButton />
      <option value="">Select car</option>
      <div aria-labelledby="select-grouped-1-french" role="group">
        <label class="ui-text" id="select-grouped-1-french">French cars</label>
        <option>Citroën</option>
        <option>Renault</option>
      </div>
      <div aria-labelledby="select-grouped-1-swedish" role="group">
        <label class="ui-text" id="select-grouped-1-swedish"
          >Swedish cars</label
        >
        <option>Saab</option>
        <option>Volvo</option>
      </div>
    </select>
  </Field>
</template>
