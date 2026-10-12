export const createToken = () => `opui-${crypto.randomUUID()}`

export const fillToken = (html: string, token: string, value?: string) =>
  html.replace(
    new RegExp(`\\s([\\w-]+)="([^"]*)${token}([^"]*)"`, "g"),
    (_, name: string, before: string, after: string) => {
      const filled = `${before}${value ?? ""}${after}`
        .trim()
        .replace(/\s+/g, " ")
      return filled ? ` ${name}="${filled}"` : ""
    },
  )
