const escape = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

export const formatInline = (text: string) =>
  escape(text).replace(/`([^`]+)`/g, "<code>$1</code>")
