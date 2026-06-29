// Augment Astro's JSX intrinsic <button> attributes with the new
// invoker/interest-target attributes (`command`, `commandfor`, `interestfor`),
// which aren't in Astro's typings yet. Keeps example pages typecheck-clean
// without per-call casts.
declare namespace astroHTML.JSX {
  interface ButtonHTMLAttributes {
    command?: string
    commandfor?: string
    interestfor?: string
  }
}

declare namespace App {
  // Augments the package-level `App.Locals` declaration in
  // `packages/opui/env.d.ts`. Interface declarations merge across files;
  // type aliases do not - keep both as `interface` so additions here are
  // additive instead of clobbering the base shape.
  interface Locals {
    /**
     * Returns a framework-correct href for the current request. Resolves the
     * given canonical docs path (e.g. `/components/button`) to either `/...`
     * (default framework) or `/<framework>/...` based on `Astro.currentLocale`.
     * Use this for any `href` value in shared content; pages render correctly
     * at build time, so no runtime link rewriting is needed.
     */
    link: (path: string) => string
    /**
     * Slug of the component currently being rendered, set by the
     * `Component` layout from its `slug` prop. Read by `<AutoExample>` and
     * the layout's auto-API resolver to glob-import per-component files
     * without each doc page repeating the slug on every example.
     */
    componentSlug?: string
  }
}
