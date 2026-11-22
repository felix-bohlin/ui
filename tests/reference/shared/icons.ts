export const ICONS = {
  bell: "M12 3a6 6 0 0 0-6 6v3.5L4.5 15v1h15v-1L18 12.5V9a6 6 0 0 0-6-6Zm-2 15a2 2 0 0 0 4 0",
  menu: "M4 6h16M4 12h16M4 18h16",
  more: "M6 12h.01M12 12h.01M18 12h.01",
  next: "M9 6l6 6-6 6",
  palette:
    "M12 3a9 9 0 0 0 0 18c1 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-7.9-9-7.9ZM7.5 12h.01M9.5 8h.01M14.5 8h.01",
  previous: "M15 6l-6 6 6 6",
} as const

export type IconName = keyof typeof ICONS
