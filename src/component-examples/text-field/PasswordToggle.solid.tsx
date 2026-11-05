/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function PasswordToggle() {
  return (
    <>
      <TextField
        autocomplete="current-password"
        id="text-field-password-toggle-1"
        label="Password"
        passwordToggle
        type="password"
      />
      <TextField
        autocomplete="new-password"
        endText="At least 12 characters."
        id="text-field-password-toggle-2"
        label="New password"
        minlength={12}
        passwordToggle
        type="password"
      />
    </>
  )
}
