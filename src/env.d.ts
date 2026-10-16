// Augment Astro's JSX intrinsic <button> attributes with the new
// interest-target attribute (`interestfor`), which isn't in Astro's typings
// yet. Keeps example pages typecheck-clean without per-call casts.
declare namespace astroHTML.JSX {
  interface AnchorHTMLAttributes {
    interestfor?: string
  }

  interface ButtonHTMLAttributes {
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
     * Framework of the current request, from the URL prefix. Framework-free
     * pages (`/blocks`, `/learn`, `/tests`, …) get the default framework.
     */
    framework: import("./utils/framework").FrameworkId
    /**
     * Returns a framework-correct href for the current request. Resolves a
     * canonical docs path (e.g. `/components/button`) to
     * `/<framework>/components/button/`. Framework-free pages are built with the
     * default framework; `relinkDocs()` in Layout.astro repoints them at runtime.
     * Use this for any `href` value in shared content.
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

interface Window {
  showToast?: (options?: import("@opui/css/js/toast.js").ToastOptions) => void
  themeUtils: {
    applyCustomTheme: (theme?: "dark" | "light") => void
    applyTheme: (theme: "dark" | "light") => void
    getCustomTheme: (
      theme: "dark" | "light",
    ) => import("./utils/theme-store").ModeConfig
    getStoredContrast: () => string | null
    getStoredTheme: () => string | null
    getSystemPreference: () => "dark" | "light"
    setContrast: (contrast: "more" | "normal" | null) => void
    setTheme: (theme: "dark" | "light") => void
  }
}
