import type { ComponentApi } from "../types"

export default {
  component: "Callout",
  notes: {
    astro:
      'For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`.',
    react:
      'For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`.',
    svelte:
      'For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`.',
    vue: 'For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`.',
  },
  options: [
    {
      description:
        "The severity. Sets the color, and in Astro, React, Svelte and Vue the icon `CalloutIcon` renders.",
      group: "Severities",
      prop: "severity",
      values: {
        critical: ".ui-critical",
        info: ".ui-info",
        neutral: ".ui-neutral",
        success: ".ui-success",
        warning: ".ui-warning",
      },
    },
    {
      default: '"tonal"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { outlined: ".ui-outlined", tonal: null },
    },
  ],
  parts: [
    {
      code: "<svg>",
      component: {
        astro: "CalloutIcon",
        react: "CalloutIcon",
        svelte: "CalloutIcon",
        vue: "CalloutIcon",
      },
      description:
        "An optional icon before the content. In Astro, React, Svelte and Vue, `CalloutIcon` renders the default one for info, success, warning and critical.",
      selector: ".ui-callout > svg",
    },
    {
      component: {
        astro: "CalloutContent",
        react: "CalloutContent",
        svelte: "CalloutContent",
        vue: "CalloutContent",
      },
      description: "The content, with an optional heading first.",
      selector: ".ui-content",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-callout",
  },
  slots: [
    {
      description: "The callout parts, and any other content.",
      name: "default",
    },
  ],
  source: "Callout",
} satisfies ComponentApi
