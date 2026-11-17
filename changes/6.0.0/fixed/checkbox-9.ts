import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Dialog`, `Drawer`, `Radio`, `Switch`, `Tabs` and `ToggleButton` no longer need Vite's `import.meta.env` types or runtime for their dev-only warnings. Where `import.meta.env.DEV` is undefined they read `process.env.NODE_ENV`, so the warnings also show with webpack and Turbopack (Next.js).",
} satisfies Change
