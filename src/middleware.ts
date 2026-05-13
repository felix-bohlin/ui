import { defineMiddleware } from "astro:middleware"
import {
  DEFAULT_FRAMEWORK,
  hrefFor,
  isFrameworkId,
  type FrameworkId,
} from "./utils/framework-routing"

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.$id = (() => {
    // The map to store how many times each prefix has been used in this request.
    const map = new Map<string, number>()
    return (prefix: string) => {
      const count = (map.get(prefix) ?? 0) + 1
      map.set(prefix, count)
      return `${prefix}-${count}`
    }
  })()

  // Pre-bind a framework-aware link resolver for this request. Authoring
  // shared docs content can then write `link("/components/button")` and get
  // `/components/button` or `/astro/components/button` automatically — no
  // runtime DOM rewriting required.
  //
  // We derive the framework from the URL prefix rather than
  // `context.currentLocale`. Astro's `currentLocale` is unreliable in
  // middleware (often `undefined` for prerendered pages because routing
  // metadata hasn't resolved yet at this stage), so we parse the pathname
  // ourselves — it's the same source of truth Astro uses anyway.
  const firstSegment = context.url.pathname.split("/")[1] ?? ""
  const framework: FrameworkId = isFrameworkId(firstSegment)
    ? firstSegment
    : DEFAULT_FRAMEWORK
  context.locals.link = (path: string) => hrefFor(framework, path)

  return await next()
})
