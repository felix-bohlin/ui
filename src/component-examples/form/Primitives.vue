<script setup lang="ts">
import {
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldLabel,
  FieldStartText,
  FieldControl,
  FieldEndText,
} from "opui-css/vue"
</script>

<template>
  <FieldSet>
    <FieldLegend>Custom Form Layout</FieldLegend>

    <FieldGroup>
      <label class="ui-text-field" data-invalid="true">
        <FieldLabel label="Username" />
        <FieldStartText text="Choose a unique handle." />

        <FieldControl>
          <template #prefix
            ><span class="ui-icon" aria-hidden="true">@</span></template
          >
          <input
            type="text"
            name="username"
            placeholder="johndoe"
            aria-invalid="true"
          />
        </FieldControl>

        <FieldEndText text="This username is already taken." />
      </label>
    </FieldGroup>
  </FieldSet>
</template>
