import Link from "next/link"
import type { ReactNode } from "react"
import slugs from "../examples/slugs.json"
import "./globals.css"
import Hydrated from "./hydrated"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          {slugs.map((slug) => (
            <Link href={`/${slug}`} key={slug}>
              {slug}
            </Link>
          ))}
        </nav>
        <main>{children}</main>
        <Hydrated />
      </body>
    </html>
  )
}
