import { Field, PasswordToggle } from "opui-css/react"

export default function PasswordToggleExample() {
  return (
    <>
      <Field
        end={<PasswordToggle htmlFor="text-field-password-toggle-1" />}
        htmlFor="text-field-password-toggle-1"
        label="Password"
      >
        <input
          autoComplete="current-password"
          id="text-field-password-toggle-1"
          type="password"
        />
      </Field>
      <Field
        end={
          <PasswordToggle
            htmlFor="text-field-password-toggle-2"
            label="Show new password"
          />
        }
        endText="At least 12 characters."
        htmlFor="text-field-password-toggle-2"
        label="New password"
      >
        <input
          aria-describedby="text-field-password-toggle-2-end-text"
          autoComplete="new-password"
          id="text-field-password-toggle-2"
          minLength={12}
          type="password"
        />
      </Field>
    </>
  )
}
