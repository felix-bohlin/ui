import path from "node:path"
import type { NextConfig } from "next"

export default {
  turbopack: { root: path.join(import.meta.dirname, "..") },
} satisfies NextConfig
