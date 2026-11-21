<script setup lang="ts">
import {
  Button,
  Divider,
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
      <FieldLegend>Post content</FieldLegend>
      <FieldGroup>
        <TextField for="form-divider-1" label="Title">
          <input id="form-divider-1" placeholder="My new post" />
        </TextField>
      </FieldGroup>
    </Fieldset>
    <Divider />
    <FieldGroup>
      <Button>Save draft</Button>
      <Button variant="filled">Publish</Button>
    </FieldGroup>
  </Form>
</template>
