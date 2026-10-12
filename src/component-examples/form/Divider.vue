<script setup lang="ts">
import {
  Button,
  Divider,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>Post Content</FieldLegend>
      <FieldGroup>
        <TextField>
          <TextFieldLabel>Title</TextFieldLabel>
          <TextFieldControl>
            <TextFieldInput placeholder="My new post" />
          </TextFieldControl>
        </TextField>
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldGroup>
      <Button>Save draft</Button>
      <Button variant="filled">Publish</Button>
    </FieldGroup>
  </Form>
</template>
