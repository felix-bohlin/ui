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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
