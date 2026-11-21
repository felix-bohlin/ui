import {
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  FieldGroup,
  Form,
  TextField,
} from "opui-css/react"

export default function ErrorSummary() {
  return (
    <Form>
      <Callout
        aria-labelledby="form-error-summary-4"
        id="form-error-summary-1"
        role="group"
        severity="critical"
        tabIndex={-1}
      >
        <CalloutIcon />
        <CalloutContent className="ui-rich-text">
          <h3 id="form-error-summary-4">Fix 2 fields to create your account</h3>
          <ul>
            <li>
              <a href="#form-error-summary-2">Enter your work email</a>
            </li>
            <li>
              <a href="#form-error-summary-3">
                Choose a password with at least 12 characters
              </a>
            </li>
          </ul>
        </CalloutContent>
      </Callout>
      <FieldGroup>
        <TextField
          endText="Enter your work email."
          htmlFor="form-error-summary-2"
          label="Email"
        >
          <input
            aria-describedby="form-error-summary-2-end-text"
            aria-invalid="true"
            autoComplete="email"
            id="form-error-summary-2"
            type="email"
          />
        </TextField>
        <TextField
          endText="Choose a password with at least 12 characters."
          htmlFor="form-error-summary-3"
          label="Password"
        >
          <input
            aria-describedby="form-error-summary-3-end-text"
            aria-invalid="true"
            autoComplete="new-password"
            id="form-error-summary-3"
            type="password"
            defaultValue="hunter2"
          />
        </TextField>
      </FieldGroup>
      <FieldGroup>
        <Button type="submit" variant="filled">
          Create account
        </Button>
      </FieldGroup>
    </Form>
  )
}
