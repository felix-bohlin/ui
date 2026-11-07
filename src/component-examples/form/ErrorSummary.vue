<script setup lang="ts">
import {
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  FieldGroup,
  Form,
  TextField,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <Callout id="form-error-summary-1" severity="critical" tabindex="-1">
      <CalloutIcon />
      <CalloutContent class="ui-rich-text">
        <h3>Fix 2 fields to create your account</h3>
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
      <TextField
        autocomplete="email"
        endText="Enter your work email."
        error
        id="form-error-summary-2"
        label="Email"
        type="email"
      />
      <TextField
        autocomplete="new-password"
        endText="Choose a password with at least 12 characters."
        error
        id="form-error-summary-3"
        label="Password"
        type="password"
        value="hunter2"
      />
    </FieldGroup>
    <FieldGroup>
      <Button type="submit" variant="filled">Create account</Button>
    </FieldGroup>
  </Form>
</template>
