# opui Figma plugin

Syncs an opui theme into the open Figma file: a variable collection with a mode per color scheme, effect styles for the shadows and text styles for the type roles. It runs `packages/opui/figma/sync.js`, which agents also run through the Figma MCP server's `use_figma` tool.

## Build

```bash
pnpm build-figma-plugin
```

It writes `dist/code.js` (`sync.js` and `src/main.js`) and `dist/ui.html` (`src/ui.html` with every theme in `packages/opui/figma/themes`). Run it again after `pnpm build` regenerates the themes.

## Run it from this repository

In the Figma desktop app, open a design file, then Plugins, Development, Import plugin from manifest, and pick `packages/figma-plugin/manifest.json`. The plugin then shows up under Plugins, Development.

## What it does

- Picks one of the themes or a `theme.figma.json` from the Theme builder's Figma download.
- Creates or updates the collection named after the theme, with the modes you check. When the file's plan allows fewer modes (Starter allows one), each mode gets a collection of its own.
- Matches variables, effect styles and text styles by name, so running it again updates them in place and keeps every binding. It leaves a variable of another type alone and lists the variables the theme doesn't have.
- Writes Display P3 values in a P3 file and sRGB values otherwise.
- Picks each font from the theme's font stack among the fonts the file has, and Inter when it has none of them.

## Publish

Figma assigns a plugin id when you publish: in the desktop app, Plugins, Development, Manage plugins in development, then Publish on this plugin. Replace `id` in `manifest.json` with the one Figma gives, and commit it.
