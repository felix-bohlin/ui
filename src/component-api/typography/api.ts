import type { ComponentApi } from "../types"

export default {
  component: "Typography",
  css: ["link", "typography"],
  notes: {
    astro: "Add the classes to elements in your templates.",
    react: "Add the classes to elements in your markup.",
    svelte: "Add the classes to elements in your markup.",
    vue: "Add the classes to elements in your templates.",
  },
  options: [
    {
      class: ".ui-blockquote",
      description: "Quoted block with a start border.",
      group: "Blockquote",
      prop: "blockquote",
    },
    {
      class: ".ui-caption",
      description: "Muted supporting text.",
      group: "Caption",
      prop: "caption",
    },
    {
      class: "pre.ui-code-block",
      description: "Monospace preformatted block.",
      group: "Code block",
      prop: "codeBlock",
    },
    {
      description:
        "Tone of `.ui-swatch`. Without it, the swatch takes the palette accent of the scope it sits in.",
      group: "Colors",
      prop: "color",
      values: {
        critical: ".ui-critical",
        info: ".ui-info",
        neutral: ".ui-neutral",
        success: ".ui-success",
        warning: ".ui-warning",
      },
    },
    {
      description: "Heading styles for any element.",
      group: "Heading",
      prop: "heading",
      values: {
        h1: ".ui-h1",
        h2: ".ui-h2",
        h3: ".ui-h3",
        h4: ".ui-h4",
        h5: ".ui-h5",
        h6: ".ui-h6",
      },
    },
    {
      class: ".ui-hgroup",
      description: "Groups an overline, heading, and optional body copy.",
      group: "Heading group",
      prop: "headingGroup",
    },
    {
      class: ".ui-icon",
      description:
        "Sizes an inline `svg` to `--ui-icon-size` and keeps it from shrinking in a flex row.",
      group: "Icon",
      prop: "icon",
    },
    {
      description: "Inline text element utilities.",
      group: "Inline",
      prop: "inline",
      values: {
        abbr: ".ui-abbr",
        cite: ".ui-cite",
        del: ".ui-del",
        dfn: ".ui-dfn",
        ins: ".ui-ins",
        kbd: ".ui-kbd",
        mark: ".ui-mark",
        s: ".ui-s",
        samp: ".ui-samp",
        small: ".ui-small",
        sub: ".ui-sub",
        sup: ".ui-sup",
        u: ".ui-u",
        var: ".ui-var",
      },
    },
    {
      class: ".ui-link",
      description:
        "Link styles outside `.ui-rich-text`. On hover and focus, the underline gets thicker. The color gets darker in light mode and lighter in dark mode.",
      group: "Link",
      prop: "link",
    },
    {
      class: ".ui-not-rich-text",
      description: "Ends the `.ui-rich-text` styles inside it.",
      group: "Not rich text",
      prop: "notRichText",
    },
    {
      class: ".ui-overline",
      description: "Small uppercase label text.",
      group: "Overline",
      prop: "overline",
    },
    {
      class: ".ui-p",
      description: "Body paragraph styling.",
      group: "Paragraph",
      prop: "paragraph",
    },
    {
      default: '"medium"',
      description:
        "Size modifiers on `.ui-p` and `.ui-icon`. An icon reads `--ui-icon-size-small` and `--ui-icon-size-large`.",
      group: "Sizes",
      prop: "size",
      values: { large: ".ui-large", medium: null, small: ".ui-small" },
    },
    {
      class: ".ui-swatch",
      description:
        "A small colored dot for a legend, in `--_swatch-bg-color`, the palette accent of its tone or scope.",
      group: "Swatch",
      prop: "swatch",
    },
  ],
  parts: [],
  root: {
    description: "Classless typography for uncontrolled child markup.",
    selector: ".ui-rich-text",
  },
} satisfies ComponentApi
