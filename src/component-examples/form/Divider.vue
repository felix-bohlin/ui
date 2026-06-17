<script setup lang="ts">
import {
  Button,
  Divider,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  TextField,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>Post Content</FieldLegend>
      <FieldGroup>
        <TextField label="Title" placeholder="My new post" />
      </FieldGroup>
    </FieldSet>

    <Divider />

    <FieldGroup>
      <Button variant="filled">Publish</Button>
    </FieldGroup>
  </Form>
</template>
