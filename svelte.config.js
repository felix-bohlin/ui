export default {
  compilerOptions: {
    warningFilter: (warning) =>
      !(
        (warning.filename?.includes("component-examples") &&
          warning.code.startsWith("a11y")) ||
        (warning.filename?.endsWith("DataGrid/DataGrid.svelte") &&
          warning.code === "a11y_no_noninteractive_tabindex")
      ),
  },
}
