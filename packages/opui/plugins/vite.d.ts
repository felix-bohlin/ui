import type { Plugin } from "vite"

export interface OpuiConfig {
  prefix?: string
  [key: string]: any
}

export function opui(): Plugin

export default opui
