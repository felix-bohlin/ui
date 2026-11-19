import { HydrationScript } from "@solidjs/web"
import type { JSX } from "@solidjs/web"
import { THEME_KEY } from "./lib/theme"

const themeScript = `try{const theme=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(theme)document.documentElement.dataset.theme=theme}catch{}`

export default function Document(props: { children?: JSX.Element }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="data:," rel="icon" />
        <script innerHTML={themeScript} />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  )
}
