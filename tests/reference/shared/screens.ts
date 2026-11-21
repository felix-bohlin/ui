export type Screen = {
  components: string[]
  id: string
  label: string
  path: string
}

export const SHELL_COMPONENTS = [
  "Avatar",
  "Badge",
  "Button",
  "Drawer",
  "List",
  "Menu",
]

export const SCREENS: Screen[] = [
  {
    components: [
      "Avatar",
      "Button",
      "Card",
      "Menu",
      "Textarea",
      "ToggleButton",
      "ToggleGroup",
    ],
    id: "feed",
    label: "Feed",
    path: "/",
  },
  {
    components: ["Avatar", "Button", "List", "Message", "Textarea"],
    id: "chat",
    label: "Chat",
    path: "/chat",
  },
  {
    components: ["Button", "Dialog"],
    id: "photos",
    label: "Photos",
    path: "/photos",
  },
  {
    components: [
      "Avatar",
      "Button",
      "Card",
      "DescriptionList",
      "Dialog",
      "Form",
      "Stat",
      "Tabs",
      "TextField",
      "Textarea",
    ],
    id: "profile",
    label: "Profile",
    path: "/u/sam",
  },
  {
    components: [
      "Button",
      "Callout",
      "Dialog",
      "Form",
      "OneTimeCode",
      "Radio",
      "Select",
      "Switch",
      "TextField",
    ],
    id: "settings",
    label: "Settings",
    path: "/settings",
  },
]

export const PORTS = {
  astro: 4501,
  next: 4503,
  nuxt: 4504,
  solid: 4505,
  sveltekit: 4502,
} as const

export type App = keyof typeof PORTS

export const INDEX_PORT = 4500
