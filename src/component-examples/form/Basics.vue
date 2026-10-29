<script setup lang="ts">
import {
  Button,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  TextField,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Contact</FieldLegend>
      <FieldDescription>How can we reach you?</FieldDescription>
      <FieldGroup>
        <TextField autocomplete="name" label="Name" />
        <TextField autocomplete="email" label="Email" type="email" />
      </FieldGroup>
    </Fieldset>
    <FieldGroup>
      <Button type="submit" variant="filled">Send</Button>
    </FieldGroup>
  </Form>
</template>
