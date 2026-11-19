"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ClientLinks() {
  const router = useRouter()

  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      )
        return
      const link = event.target.closest("a[href]")
      if (
        !(link instanceof HTMLAnchorElement) ||
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download")
      )
        return
      const url = new URL(link.href)
      if (url.origin !== location.origin) return
      if (
        url.hash &&
        url.pathname === location.pathname &&
        url.search === location.search
      )
        return
      event.preventDefault()
      router.push(url.pathname + url.search + url.hash)
    }
    document.addEventListener("click", click)
    return () => document.removeEventListener("click", click)
  }, [router])

  return null
}
