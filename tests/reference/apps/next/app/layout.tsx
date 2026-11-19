import type { Metadata } from "next"
import type { ReactNode } from "react"
import ClientLinks from "@/lib/client-links"
import { SentProvider } from "@/lib/chat-store"
import Header from "@/lib/header"
import Hydrated from "@/lib/hydrated"
import "./globals.css"

export const metadata: Metadata = {
  icons: { icon: "data:," },
  title: { default: "Reference", template: "%s | Reference" },
}

const theme = `try{const t=localStorage.getItem("reference-theme");if(t)document.documentElement.dataset.theme=t}catch{}`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: theme }} />
      </head>
      <body>
        <a className="ui-sr-only ui-focusable" href="#main">
          Skip to content
        </a>
        <Header />
        <main className="app-main" id="main" tabIndex={-1}>
          <SentProvider>{children}</SentProvider>
        </main>
        <ClientLinks />
        <Hydrated />
      </body>
    </html>
  )
}
