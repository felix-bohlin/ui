import { TextField } from "opui-css/react"

export default function PasswordToggle() {
  return (
    <>
      <TextField
        autoComplete="current-password"
        id="text-field-password-toggle-1"
        label="Password"
        passwordToggle
        type="password"
      />
      <TextField
        autoComplete="new-password"
        endText="At least 12 characters."
        id="text-field-password-toggle-2"
        label="New password"
        minLength={12}
        passwordToggle
        type="password"
      />
    </>
  )
}
