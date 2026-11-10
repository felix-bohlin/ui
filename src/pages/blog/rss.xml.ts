import type { APIRoute } from "astro"
import { posts } from "../../utils/blog"

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href
  const items = posts
    .toSorted(
      (a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug),
    )
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${url(`/blog/${post.slug}/`)}</link>
      <guid>${url(`/blog/${post.slug}/`)}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
    )
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Open Props UI blog</title>
    <link>${url("/blog/")}</link>
    <description>How the components are made, one technique at a time.</description>
    <language>en</language>
    <atom:link href="${url("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  )
}
