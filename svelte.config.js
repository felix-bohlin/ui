const reviewedExampleWarnings = new Set([
  "a11y_invalid_attribute",
  "a11y_label_has_associated_control",
  "a11y_media_has_caption",
  "a11y_missing_attribute",
  "a11y_no_noninteractive_tabindex",
])

const invalidChoice =
  /'aria-invalid' is not supported by the role '(checkbox|radio)'/

export default {
  compilerOptions: {
    warningFilter: (warning) =>
      !(
        (warning.filename?.includes("component-examples") &&
          reviewedExampleWarnings.has(warning.code)) ||
        (warning.filename?.includes("packages/opui/components") &&
          warning.code === "a11y_role_supports_aria_props_implicit" &&
          invalidChoice.test(warning.message))
      ),
  },
}
