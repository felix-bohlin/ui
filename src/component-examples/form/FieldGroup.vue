<script setup lang="ts">
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  Radio,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset aria-describedby="form-field-group-1-description">
      <FieldLegend>Plan</FieldLegend>
      <FieldDescription id="form-field-group-1-description"
        >You can change your plan at any time.</FieldDescription
      >
      <FieldGroup name="plan">
        <Radio value="starter">Starter</Radio>
        <Radio value="team">Team</Radio>
        <Radio value="business">Business</Radio>
      </FieldGroup>
    </Fieldset>
    <Fieldset aria-describedby="form-field-group-2-description">
      <FieldLegend>Add-ons</FieldLegend>
      <FieldDescription id="form-field-group-2-description"
        >Billed monthly with your plan.</FieldDescription
      >
      <FieldGroup name="add-ons">
        <Checkbox value="backups">
          Backups
          <template #end-text>Daily snapshots, kept for 30 days.</template>
        </Checkbox>
        <Checkbox value="encryption">
          Encryption
          <template #end-text>Encrypt your files with your own keys.</template>
        </Checkbox>
        <Checkbox value="single-sign-on">
          Single sign-on
          <template #end-text>Sign in with your company account.</template>
        </Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
