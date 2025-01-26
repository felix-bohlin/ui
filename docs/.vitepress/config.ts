import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
      pattern: "https://github.com/felix-bohlin/ui/tree/main/docs/:path",
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
      { text: "Components", link: "/components/actions/button" },
      { text: "API", link: "/api" },
      // { text: "Blog", link: "/blog" },
      { text: "Open Props", link: "https://open-props.style/" },
    ],

    sidebar: {
      "/guide": [
        {
          text: "Guide",
          items: [
            {
              text: "What is Open Props UI?",
              link: "/guide/what-is-open-props-ui",
            },
            {
              text: "Getting started",
              link: "/guide/getting-started",
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
              ],
            },
            {
              text: "Browser compatibility",
              link: "/guide/browser-compatibility",
            },
          ],
        },
        {
          text: "Roadmap",
          link: "/guide/roadmap",
        },
        {
          text: "Acknowledgments",
          link: "/guide/acknowledgments",
        },
      ],
      "/components": [
        {
          text: "Components",
          items: [
            {
              text: "Actions",
              collapsed: false,
              items: [
                { text: "Button", link: "/components/actions/button" },
                {
                  text: "Button group",
                  link: "/components/actions/button-group",
                },
                {
                  text: "Icon Button",
                  link: "/components/actions/icon-button",
                },
                {
                  text: "Toggle button group",
                  link: "/components/actions/toggle-button-group",
                },
              ],
            },
            {
              text: "Inputs",
              collapsed: false,
              items: [
                { text: "Checkbox", link: "/components/inputs/checkbox" },
                { text: "Radio", link: "/components/inputs/radio" },
                { text: "Range", link: "/components/inputs/range" },
                { text: "Select", link: "/components/inputs/select" },
                { text: "Switch", link: "/components/inputs/switch" },
                { text: "Textarea", link: "/components/inputs/textarea" },
                { text: "Text field", link: "/components/inputs/text-field" },
              ],
            },
            {
              text: "Data display",
              collapsed: false,
              items: [
                {
                  text: "Accordion",
                  link: "/components/data-display/accordion",
                },
                { text: "Avatar", link: "/components/data-display/avatar" },
                { text: "Badge", link: "/components/data-display/badge" },
                { text: "Card", link: "/components/data-display/card" },
                { text: "Chip", link: "/components/data-display/chip" },
                {
                  text: "Definition list",
                  link: "/components/data-display/definition-list",
                },
                { text: "Divider", link: "/components/data-display/divider" },
                { text: "List", link: "/components/data-display/list" },
                { text: "Table", link: "/components/data-display/table" },
                // { text: "Tooltip", link: "/components/data-display/tooltip" },
              ],
            },
            {
              text: "Feedback",
              collapsed: false,
              items: [
                { text: "Alert", link: "/components/feedback/alert" },
                { text: "Dialog", link: "/components/feedback/dialog" },
                { text: "Progress", link: "/components/feedback/progress" },
                { text: "Snackbar", link: "/components/feedback/snackbar" },
                { text: "Spinner", link: "/components/feedback/spinner" },
              ],
            },
            {
              text: "Typography",
              collapsed: false,
              items: [
                {
                  text: "Rich text",
                  link: "/components/text/rich-text",
                },
                {
                  text: "Typography",
                  link: "/components/text/typography",
                },
              ],
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
