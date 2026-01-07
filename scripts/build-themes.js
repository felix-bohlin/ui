#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { execSync, spawn } from "child_process"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const themesDir = path.join(__dirname, "..", "src", "themes")
const distDir = path.join(__dirname, "..", "dist")

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Get all theme directories
const themes = fs.readdirSync(themesDir).filter((item) => {
  return fs.statSync(path.join(themesDir, item)).isDirectory()
})

console.log(`Found themes: ${themes.join(", ")}`)

// Check if we're in watch mode
const isWatch = process.argv.includes("--watch")

function buildTheme(theme, inputFile, outputFile) {
  const themeDir = path.join(themesDir, theme)
  const inputPath = path.join(themeDir, inputFile)
  const outputPath = path.join(distDir, outputFile)
  const outputSubDir = path.dirname(outputPath)

  if (fs.existsSync(inputPath)) {
    if (!fs.existsSync(outputSubDir)) {
      fs.mkdirSync(outputSubDir, { recursive: true })
    }

    console.log(`Building ${theme}/${inputFile} -> dist/${outputFile}`)

    try {
      execSync(`npx postcss "${inputPath}" -o "${outputPath}"`, {
        stdio: "inherit",
        cwd: path.join(__dirname, ".."),
      })
      return true
    } catch (error) {
      console.error(`Error building ${theme}/${inputFile}:`, error.message)
      return false
    }
  }
  return false
}

function buildAllThemes() {
  themes.forEach((theme) => {
    buildTheme(theme, "imports.css", `${theme}/${theme}.css`)
    buildTheme(theme, "components.css", `${theme}/components.css`)
  })
}

if (isWatch) {
  console.log("Starting watch mode...\n")

  // Initial build
  buildAllThemes()

  // Watch for changes using native fs.watch
  const watchedFiles = new Map()

  themes.forEach((theme) => {
    const themeDir = path.join(themesDir, theme)
    const importsCssPath = path.join(themeDir, "imports.css")
    const componentsCssPath = path.join(themeDir, "components.css")

    if (fs.existsSync(importsCssPath)) {
      const watcher = fs.watchFile(importsCssPath, { interval: 1000 }, () => {
        console.log(`\nDetected change in ${theme}/imports.css`)
        buildTheme(theme, "imports.css", `${theme}/${theme}.css`)
      })
      watchedFiles.set(importsCssPath, watcher)
    }

    if (fs.existsSync(componentsCssPath)) {
      const watcher = fs.watchFile(
        componentsCssPath,
        { interval: 1000 },
        () => {
          console.log(`\nDetected change in ${theme}/components.css`)
          buildTheme(theme, "components.css", `${theme}/components.css`)
        },
      )
      watchedFiles.set(componentsCssPath, watcher)
    }
  })

  console.log("\nWatching for changes... Press Ctrl+C to stop.")

  // Keep the process alive
  process.on("SIGINT", () => {
    console.log("\nStopping watch mode...")
    watchedFiles.forEach((watcher, filePath) => {
      fs.unwatchFile(filePath)
    })
    process.exit(0)
  })

  // Keep process alive
  setInterval(() => {}, 1000)
} else {
  // Build mode
  buildAllThemes()
  console.log("\nBuild complete!")
}
