<script setup lang="ts">
import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>Options</FieldLegend>
      <FieldGroup direction="row">
        <Checkbox>
          <CheckboxInput />
          <CheckboxLabel>Option 1</CheckboxLabel>
        </Checkbox>
        <Checkbox>
          <CheckboxInput />
          <CheckboxLabel>Option 2</CheckboxLabel>
        </Checkbox>
        <Checkbox>
          <CheckboxInput />
          <CheckboxLabel>Option 3</CheckboxLabel>
        </Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
