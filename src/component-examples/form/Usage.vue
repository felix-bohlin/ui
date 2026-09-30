<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend><!-- --></FieldLegend>
      <FieldDescription><!-- --></FieldDescription>
      <FieldGroup>
        <!-- -->
      </FieldGroup>
      <FieldGroup>
        <!-- -->
      </FieldGroup>
    </FieldSet>
  </Form>

  <!-- or -->

  <Form as="div">
    <FieldSet as="div">
      <FieldLegend as="p"><!-- --></FieldLegend>
      <FieldDescription><!-- --></FieldDescription>
      <FieldGroup>
        <!-- -->
      </FieldGroup>
      <FieldGroup>
        <!-- -->
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
