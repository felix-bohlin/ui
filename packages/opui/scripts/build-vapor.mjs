import { globSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")

export const isVaporSource = (file) =>
  file.endsWith(".vue") && !file.endsWith(".vapor.vue")

export const toVaporPath = (file) => file.replace(/\.vue$/, ".vapor.vue")

export const toVapor = (source) =>
  (source.includes("<script setup")
    ? source.replace("<script setup", "<script setup vapor")
    : source.replace(/^<template>/m, "<template vapor>")
  ).replace(/(from "\.{1,2}\/[^"]+?)(?<!\.d)\.vue"/g, '$1.vapor.vue"')

export const buildVaporFile = (file) => {
  const out = toVaporPath(file)
  writeFileSync(out, toVapor(readFileSync(file, "utf8")))
  return out
}

export const buildVapor = () => {
  const files = globSync("components/**/*.vue", { cwd: root })
    .filter(isVaporSource)
    .map((file) => resolve(root, file))
    .sort()

  for (const file of files) buildVaporFile(file)

  const barrel = readFileSync(resolve(root, "vue/index.ts"), "utf8").replace(
    /\.vue"/g,
    '.vapor.vue"',
  )
  writeFileSync(resolve(root, "vue/vapor.ts"), barrel)

  console.log(`built ${files.length} vapor components + vue/vapor.ts`)
  return files.map((file) => relative(root, file))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) buildVapor()
