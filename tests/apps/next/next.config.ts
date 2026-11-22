import path from "node:path"
import type { NextConfig } from "next"

const readme = process.env.OPUI_README_BUILD

export default {
  turbopack: { root: path.join(import.meta.dirname, "..") },
  ...(readme ? { ...JSON.parse(readme), distDir: ".next-readme" } : {}),
} satisfies NextConfig
