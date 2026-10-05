export default {
  compilerOptions: {
    warningFilter: (warning) =>
      !(
        warning.filename?.includes("component-examples") &&
        warning.code.startsWith("a11y")
      ),
  },
}
