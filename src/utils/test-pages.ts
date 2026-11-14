export const fixturePagesEnabled = () => !!process.env.OPUI_TEST_PAGES

export const testPagesEnabled = () =>
  fixturePagesEnabled() || import.meta.env.DEV

export const stressPages = import.meta.glob<string>("../stress-tests/*.html", {
  eager: true,
  import: "default",
  query: "?raw",
})

export const stressSlug = (path: string) =>
  path.match(/stress-tests\/([^/]+)\.html$/)![1]
