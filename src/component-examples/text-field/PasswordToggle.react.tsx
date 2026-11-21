import { TextField } from "opui-css/react"

export default function PasswordToggle() {
  return (
    <>
      <TextField
        htmlFor="text-field-password-toggle-1"
        label="Password"
        passwordToggle
      >
        <input
          autoComplete="current-password"
          id="text-field-password-toggle-1"
          type="password"
        />
      </TextField>
      <TextField
        endText="At least 12 characters."
        htmlFor="text-field-password-toggle-2"
        label="New password"
        passwordToggle
      >
        <input
          aria-describedby="text-field-password-toggle-2-end-text"
          autoComplete="new-password"
          id="text-field-password-toggle-2"
          minLength={12}
          type="password"
        />
      </TextField>
    </>
  )
}
