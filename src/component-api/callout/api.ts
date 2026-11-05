import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Callout",
  notes: components(
    'For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`.',
  ),
  options: [
    {
      description:
        "The severity. Sets the color, and in Astro, React, Solid, Svelte and Vue the icon `CalloutIcon` renders.",
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
      component: "CalloutIcon",
      description:
        "An optional icon before the content. In Astro, React, Solid, Svelte and Vue, `CalloutIcon` renders the default one for critical, info, success and warning.",
      selector: ".ui-callout > svg",
    },
    {
      component: "CalloutContent",
      description: "The content, with an optional heading first.",
      selector: ".ui-content",
    },
    {
      component: "CalloutActions",
      description: "A row of buttons under the content.",
      selector: ".ui-actions",
    },
    {
      code: "<button>",
      description:
        "A close button, a `.ui-button` that is a direct child of the callout. It sits at the end of the first row.",
      selector: ".ui-callout > .ui-button",
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
