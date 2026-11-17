import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Toast`. The Astro and Vue components, `toast.css` with `.ui-toast` and its parts (`.ui-close-button`, `.ui-exiting`, `.ui-icon`, `.ui-title`), `css/js/toast.js` with `initToastManager()` and `showToast()`, and their types are gone. `Toaster` replaces them, and `toast()` replaces `showToast()`.",
} satisfies Change
