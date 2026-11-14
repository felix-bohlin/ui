export const ICON_ROLES = [
  "check",
  "clear",
  "close",
  "critical",
  "decrease",
  "error",
  "expand",
  "hide",
  "increase",
  "info",
  "next",
  "rating",
  "rating-empty",
  "show",
  "sort",
  "success",
  "warning",
] as const

export type IconRole = (typeof ICON_ROLES)[number]

export type IconLibrary = {
  copyright?: string
  frameworks: Partial<Record<"react" | "svelte" | "vue", string>>
  icons: Record<IconRole, string>
  license: string
  name: string
  package: string
  url: string
}

export const ICON_LIBRARIES = {
  fluent: {
    copyright: "Copyright (c) 2020 Microsoft Corporation",
    frameworks: { react: "@fluentui/react-icons" },
    icons: {
      check: "icons/checkmark_24_filled.svg",
      clear: "icons/prohibited_24_filled.svg",
      close: "icons/dismiss_32_regular.svg",
      critical: "icons/error_circle_48_regular.svg",
      decrease: "icons/subtract_24_filled.svg",
      error: "icons/important_16_filled.svg",
      expand: "icons/chevron_down_24_filled.svg",
      hide: "icons/eye_off_32_filled.svg",
      increase: "icons/add_24_filled.svg",
      info: "icons/info_32_regular.svg",
      next: "icons/chevron_right_24_filled.svg",
      rating: "icons/star_20_filled.svg",
      "rating-empty": "icons/star_20_regular.svg",
      show: "icons/eye_32_filled.svg",
      sort: "icons/chevron_down_24_filled.svg",
      success: "icons/checkmark_circle_32_regular.svg",
      warning: "icons/warning_24_regular.svg",
    },
    license: "MIT",
    name: "Fluent UI System Icons",
    package: "@fluentui/svg-icons",
    url: "https://github.com/microsoft/fluentui-system-icons",
  },
} satisfies Record<string, IconLibrary>

export type IconLibraryId = keyof typeof ICON_LIBRARIES

export const iconUrl = (svg: string) =>
  `url("data:image/svg+xml,${svg
    .replaceAll('"', "'")
    .replace(/[%#<>]/g, (character) => encodeURIComponent(character))}")`
