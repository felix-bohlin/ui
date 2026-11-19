import { HydrationScript } from "@solidjs/web"
import type { JSX } from "@solidjs/web"

export default function Document(props: { children?: JSX.Element }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="data:," rel="icon" />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  )
}
