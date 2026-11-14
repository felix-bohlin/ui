"use client"

import { useEffect } from "react"

export default function Hydrated() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = ""
  }, [])
  return null
}
