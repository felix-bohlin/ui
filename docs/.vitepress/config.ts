import { defineConfig } from "vitepress"

const components = [
  {
    text: "Accordion",
    link: "/components/accordion",
  },
  { text: "Alert", link: "/components/alert" },
  { text: "Avatar", link: "/components/avatar" },
  { text: "Badge", link: "/components/badge" },
  { text: "Button", link: "/components/button" },
  {
    text: "Button group",
    link: "/components/button-group",
  },
  { text: "Card", link: "/components/card" },
  { text: "Checkbox", link: "/components/checkbox" },
  { text: "Chip", link: "/components/chip" },
  {
    text: "Definition list",
    link: "/components/definition-list",
  },
  { text: "Dialog", link: "/components/dialog" },
  { text: "Divider", link: "/components/divider" },
  {
    text: "Icon Button",
    link: "/components/icon-button",
  },
  { text: "List", link: "/components/list" },
  { text: "Progress", link: "/components/progress" },
  { text: "Radio", link: "/components/radio" },
  { text: "Range", link: "/components/range" },
  {
    text: "Rich text",
    link: "/components/rich-text",
  },
  { text: "Select", link: "/components/select" },
  { text: "Snackbar", link: "/components/snackbar" },
  { text: "Spinner", link: "/components/spinner" },
  { text: "Switch", link: "/components/switch" },
  {
    text: "Tab buttons",
    link: "/components/tab-buttons",
  },
  { text: "Table", link: "/components/table" },
  // { text: "Tooltip", link: "/components/tooltip" },
  { text: "Text field", link: "/components/text-field" },
  { text: "Textarea", link: "/components/textarea" },
  {
    text: "Toggle button group",
    link: "/components/toggle-button-group",
  },
  {
    text: "Typography",
    link: "/components/typography",
  },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "Open Props UI",
  description:
    "CSS UI library leveraging the most modern features. Components you can copy and paste into your project.",
  markdown: {
    theme: "dark-plus",
  },
  head: [
    ["link", { rel: "icon", type: "image/ico", href: "/favicon.ico" }],
    ["link", { rel: "icon", type: "image/png", href: "/ui-logo.png" }],
    ["meta", { name: "theme-color", content: "var(--color-8)" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en" }],
    [
      "meta",
      {
        property: "og:title",
        content: "Open Props UI | A modern CSS UI library",
      },
    ],
    ["meta", { property: "og:site_name", content: "Open Props UI" }],
    ["meta", { property: "og:image", content: "/opui-logo.png" }],
    [
      "meta",
      { property: "og:url", content: "https://open-props-ui.netlify.app" },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: "https://github.com/felix-bohlin/ui-docs/tree/main/docs/:path",
    },
    outline: "deep",
    search: {
      provider: "local",
      options: {
        detailedView: true,
      },
    },
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Components", link: "/components" },
      { text: "API", link: "/api" },
      { text: "Blog", link: "/blog" },
      { text: "Open Props", link: "https://open-props.style/" },
    ],
    sidebar: {
      "/guide": [
        {
          text: "Guide",
          collapsed: true,
          items: [
            {
              text: "Getting started",
              link: "/guide/getting-started",
              items: [
                {
                  text: "Imports",
                  link: "/guide/getting-started/imports",
                },
                {
                  text: "Theme",
                  link: "/guide/getting-started/theme",
                },
                {
                  text: "Components",
                  link: "/guide/getting-started/components",
                },
                {
                  text: "Normalize",
                  link: "/guide/getting-started/normalize",
                },
                {
                  text: "Utils",
                  link: "/guide/getting-started/utils",
                },
              ],
            },
            {
              text: "What is Open Props UI?",
              link: "/guide/what-is-open-props-ui",
            },
            {
              text: "Browser compatibility",
              link: "/guide/browser-compatibility",
            },
            {
              text: "Acknowledgments",
              link: "/guide/acknowledgments",
            },
          ],
        },
        {
          text: "Components",
          collapsed: true,
          items: components,
        },
      ],
      "/components": [
        {
          text: "Guide",
          collapsed: true,
          items: [
            {
              text: "Getting started",
              link: "/guide/getting-started",
              items: [
                {
                  text: "Main",
                  link: "/guide/getting-started/main",
                },
                {
                  text: "OPUI",
                  link: "/guide/getting-started/opui",
                  items: [
                    {
                      text: "Normalize",
                      link: "/guide/getting-started/normalize",
                    },
                    {
                      text: "Utils",
                      link: "/guide/getting-started/utils",
                    },
                    {
                      text: "Theme",
                      link: "/guide/getting-started/theme",
                    },
                    {
                      text: "Components",
                      link: "/guide/getting-started/components",
                    },
                  ],
                },
              ],
            },
            {
              text: "What is Open Props UI?",
              link: "/guide/what-is-open-props-ui",
            },
            {
              text: "Browser compatibility",
              link: "/guide/browser-compatibility",
            },
            {
              text: "Acknowledgments",
              link: "/guide/acknowledgments",
            },
          ],
        },
        {
          text: "Components",
          items: components,
        },
      ],
      "/blocks": [
        {
          text: "Guide",
          items: [
            {
              text: "Getting started",
              link: "/blocks/getting-started",
            },
          ],
        },
        {
          text: "Blocks",
          items: [
            {
              text: "Teaser",
              link: "/blocks/teaser",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/felix-bohlin/ui" },
    ],
  },
})
