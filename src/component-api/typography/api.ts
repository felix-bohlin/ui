import type { ComponentApi } from "../types"

export default {
  component: "Typography",
  notes: {
    astro:
      "Add the classes to elements in your templates. There is no Astro component.",
    svelte:
      "Add the classes to elements in your markup. There is no Svelte component.",
    vue: "Add the classes to elements in your templates. There is no Vue component.",
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
      class: ".ui-hgroup",
      description: "Groups an overline, heading, and optional body copy.",
      group: "Heading group",
      prop: "hgroup",
    },
    {
      description: "Heading styles for any element.",
      group: "Headings",
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
      description: "Size modifiers on `.ui-p`.",
      group: "Sizes",
      prop: "size",
      values: { large: ".ui-large", small: ".ui-small" },
    },
  ],
  parts: [],
  root: {
    description: "Classless typography for uncontrolled child markup.",
    selector: ".ui-rich-text",
  },
} satisfies ComponentApi
