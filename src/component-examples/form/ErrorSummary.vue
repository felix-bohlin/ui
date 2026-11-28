<script setup lang="ts">
import {
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  Field,
  FieldGroup,
  Form,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <Callout
      aria-labelledby="form-error-summary-4"
      id="form-error-summary-1"
      role="group"
      severity="critical"
      tabindex="-1"
    >
      <CalloutIcon />
      <CalloutContent class="ui-rich-text">
        <h3 id="form-error-summary-4">Fix 2 fields to create your account</h3>
        <ul>
          <li><a href="#form-error-summary-2">Enter your work email</a></li>
          <li>
            <a href="#form-error-summary-3"
              >Choose a password with at least 12 characters</a
            >
          </li>
        </ul>
      </CalloutContent>
    </Callout>
    <FieldGroup>
      <Field
        endText="Enter your work email."
        for="form-error-summary-2"
        label="Email"
      >
        <input
          aria-describedby="form-error-summary-2-end-text"
          aria-invalid="true"
          autocomplete="email"
          id="form-error-summary-2"
          type="email"
        />
      </Field>
      <Field
        endText="Choose a password with at least 12 characters."
        for="form-error-summary-3"
        label="Password"
      >
        <input
          aria-describedby="form-error-summary-3-end-text"
          aria-invalid="true"
          autocomplete="new-password"
          id="form-error-summary-3"
          type="password"
          :value.attr="'hunter2'"
        />
      </Field>
    </FieldGroup>
    <FieldGroup>
      <Button type="submit" variant="filled">Create account</Button>
    </FieldGroup>
  </Form>
</template>
