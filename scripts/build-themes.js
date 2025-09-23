#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { execSync, spawn } = require("child_process")

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

  if (fs.existsSync(inputPath)) {
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
    buildTheme(theme, "theme.css", `${theme}.css`)
    buildTheme(theme, "theme+op.css", `${theme}+op.css`)
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
    const themeCssPath = path.join(themeDir, "theme.css")
    const themeOpCssPath = path.join(themeDir, "theme+op.css")

    ;[themeCssPath, themeOpCssPath].forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        const fileName = path.basename(filePath)
        const watcher = fs.watchFile(filePath, { interval: 1000 }, () => {
          console.log(`\nDetected change in ${theme}/${fileName}`)
          if (fileName === "theme.css") {
            buildTheme(theme, "theme.css", `${theme}.css`)
          } else if (fileName === "theme+op.css") {
            buildTheme(theme, "theme+op.css", `${theme}+op.css`)
          }
        })
        watchedFiles.set(filePath, watcher)
      }
    })
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
