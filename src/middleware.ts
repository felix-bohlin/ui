import { defineMiddleware } from "astro:middleware"
import {
  DEFAULT_FRAMEWORK,
  hrefFor,
  isFrameworkId,
  type FrameworkId,
} from "./utils/framework"
import { createIdGenerator } from "./utils/id"

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.$id = createIdGenerator()

  // Pre-bind a framework-aware link resolver for this request. Authoring
  // shared docs content can then write `link("/components/button")` and get
  // `/html/components/button` or `/astro/components/button` automatically.
  // Framework-free pages (`/blocks`, `/learn`, `/theme-builder`) are built once
  // with the default framework; `Layout.astro` `relinkDocs()` repoints their
  // framework-prefixed links to the visitor's framework (`FRAMEWORK_STORAGE_KEY`)
  // at runtime.
  //
  // We derive the framework from the URL prefix. Pages read it from
  // `Astro.locals.framework`.
  const firstSegment = context.url.pathname.split("/")[1] ?? ""
  const framework: FrameworkId = isFrameworkId(firstSegment)
    ? firstSegment
    : DEFAULT_FRAMEWORK
  context.locals.framework = framework
  context.locals.link = (path: string) => hrefFor(framework, path)

  return await next()
})
