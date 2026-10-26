<script setup lang="ts">
import { Button, FieldGroup, Form, Range } from "opui-css/vue"
</script>

<template>
  <Form>
    <Range label="Hue" min="0" max="360" value="250" valueSuffix="°" />
    <FieldGroup>
      <Button type="reset">Reset</Button>
    </FieldGroup>
  </Form>
</template>
