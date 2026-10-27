<script setup lang="ts">
import { Button, FieldGroup, Form, TextField } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldGroup orientation="horizontal">
      <TextField label="Discount code" name="discount" />
      <Button variant="outlined">Apply</Button>
    </FieldGroup>
  </Form>
</template>
