async function opuiFigmaSync(theme, options) {
  const settings = options || {}
  const wanted = settings.modes || theme.modes.map((mode) => mode.id)
  const modes = theme.modes.filter((mode) => wanted.indexOf(mode.id) !== -1)
  if (modes.length === 0) throw new Error("Pick at least one mode.")
  const report = {
    collections: [],
    effectStyles: [],
    textStyles: [],
    variables: { created: 0, updated: 0 },
    warnings: [],
  }
  const space =
    figma.root && figma.root.documentColorProfile === "DISPLAY_P3"
      ? "p3"
      : "srgb"
  const definitions = theme.variables.filter(
    (definition) => settings.effects !== false || !definition.helper,
  )
  const byName = {}
  for (const definition of theme.variables) byName[definition.name] = definition

  const available = {}
  for (const font of await figma.listAvailableFontsAsync()) {
    const family = font.fontName.family
    if (!available[family]) available[family] = []
    available[family].push(font.fontName.style)
  }
  const pickFamily = (candidates) => {
    for (const family of candidates || []) {
      if (available[family]) return family
    }
    return "Inter"
  }
  const WEIGHTS = {
    100: ["Thin", "Hairline"],
    200: ["ExtraLight", "Extra Light", "UltraLight", "Ultra Light"],
    300: ["Light"],
    400: ["Regular", "Normal", "Book", "Roman"],
    500: ["Medium"],
    600: ["SemiBold", "Semi Bold", "DemiBold", "Demi Bold"],
    700: ["Bold"],
    800: ["ExtraBold", "Extra Bold", "UltraBold", "Ultra Bold", "Heavy"],
    900: ["Black", "Heavy"],
  }
  const pickStyle = (family, weight) => {
    const styles = available[family] || ["Regular"]
    const target = Math.min(900, Math.max(100, Math.round(weight / 100) * 100))
    const order = [100, 200, 300, 400, 500, 600, 700, 800, 900].sort(
      (a, b) => Math.abs(a - target) - Math.abs(b - target) || b - a,
    )
    for (const candidate of order) {
      const style = WEIGHTS[candidate].find(
        (name) => styles.indexOf(name) !== -1,
      )
      if (style) return style
    }
    return styles[0]
  }

  const resolve = (name, modeId, seen) => {
    const definition = byName[name]
    const value = definition && definition.values[modeId]
    if (value && typeof value === "object" && "alias" in value) {
      if ((seen || []).indexOf(name) !== -1) return undefined
      return resolve(value.alias, modeId, (seen || []).concat(name))
    }
    return value
  }
  const color = (value) => {
    const channels = value[space]
    return { a: value.alpha, b: channels[2], g: channels[1], r: channels[0] }
  }

  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const existing = await figma.variables.getLocalVariablesAsync()
  const findCollection = (name) =>
    collections.find((collection) => collection.name === name)
  const createCollection = (name) => {
    const collection = figma.variables.createVariableCollection(name)
    collections.push(collection)
    return collection
  }
  const ensureModes = (collection, list) => {
    const ids = {}
    const added = []
    let renamed
    try {
      list.forEach((mode, index) => {
        const match = collection.modes.find((entry) => entry.name === mode.name)
        if (match) {
          ids[mode.id] = match.modeId
        } else if (
          index === 0 &&
          collection.modes.length === 1 &&
          collection.variableIds.length === 0
        ) {
          const only = collection.modes[0]
          renamed = { modeId: only.modeId, name: only.name }
          collection.renameMode(only.modeId, mode.name)
          ids[mode.id] = only.modeId
        } else {
          ids[mode.id] = collection.addMode(mode.name)
          added.push(ids[mode.id])
        }
      })
    } catch (error) {
      for (const modeId of added) collection.removeMode(modeId)
      if (renamed) collection.renameMode(renamed.modeId, renamed.name)
      throw error
    }
    return ids
  }

  let groups
  const base = findCollection(theme.collection)
  const collection = base || createCollection(theme.collection)
  try {
    groups = [{ collection, ids: ensureModes(collection, modes), modes }]
  } catch (error) {
    if (!/limit/i.test(String(error && error.message))) throw error
    if (!base && collection.variableIds.length === 0) {
      collection.remove()
      collections.splice(collections.indexOf(collection), 1)
    }
    report.warnings.push(
      "This file's plan allows fewer modes than the theme has, so each mode has a collection of its own.",
    )
    groups = modes.map((mode) => {
      const name = `${theme.collection} ${mode.name}`
      const own = findCollection(name) || createCollection(name)
      return { collection: own, ids: ensureModes(own, [mode]), modes: [mode] }
    })
  }

  const stored = (variable, modeId, seen) => {
    const value = variable.valuesByMode[modeId]
    if (!value || value.type !== "VARIABLE_ALIAS") return value
    if ((seen || []).indexOf(value.id) !== -1) return undefined
    const target = existing.find((entry) => entry.id === value.id)
    return target && stored(target, modeId, (seen || []).concat(value.id))
  }

  const lookup = (group, name) =>
    group.variables[name] ||
    existing.find(
      (entry) =>
        entry.variableCollectionId === group.collection.id &&
        entry.name === name,
    )

  for (const group of groups) {
    group.variables = {}
    for (const definition of definitions) {
      let variable = existing.find(
        (entry) =>
          entry.variableCollectionId === group.collection.id &&
          entry.name === definition.name,
      )
      if (variable && variable.resolvedType !== definition.type) {
        report.warnings.push(
          `${definition.name} is a ${variable.resolvedType} variable in this file, so it was left as it is.`,
        )
        continue
      }
      if (variable) {
        report.variables.updated++
      } else {
        try {
          variable = figma.variables.createVariable(
            definition.name,
            group.collection,
            definition.type,
          )
        } catch (error) {
          report.warnings.push(
            `${definition.name} needs ${definition.type} variables, which this file doesn't support: ${error && error.message}`,
          )
          continue
        }
        existing.push(variable)
        report.variables.created++
      }
      variable.description = definition.description || ""
      variable.hiddenFromPublishing = !!definition.hidden
      if (definition.codeSyntax) {
        variable.setVariableCodeSyntax("WEB", definition.codeSyntax)
      }
      if (definition.type !== "TIMING" && definition.type !== "EASING") {
        variable.scopes = definition.scopes
      }
      group.variables[definition.name] = variable
    }
    for (const definition of definitions) {
      const variable = group.variables[definition.name]
      if (!variable) continue
      for (const mode of group.modes) {
        const modeId = group.ids[mode.id]
        const value = definition.values[mode.id]
        if (value && typeof value === "object" && "alias" in value) {
          let target = lookup(group, value.alias)
          if (!target && settings.partial) {
            target = figma.variables.createVariable(
              value.alias,
              group.collection,
              definition.type,
            )
            existing.push(target)
            report.variables.created++
          }
          if (target) {
            variable.setValueForMode(
              modeId,
              figma.variables.createVariableAlias(target),
            )
            continue
          }
        }
        const resolved = resolve(definition.name, mode.id)
        if (resolved === undefined) continue
        if (definition.fonts) {
          variable.setValueForMode(modeId, pickFamily(definition.fonts))
        } else if (definition.type === "COLOR") {
          variable.setValueForMode(modeId, color(resolved))
        } else if (definition.type === "EASING") {
          const points = resolved.bezier
          variable.setValueForMode(modeId, {
            easingFunctionCubicBezier: {
              x1: points[0],
              x2: points[2],
              y1: points[1],
              y2: points[3],
            },
            type: "CUSTOM_CUBIC_BEZIER",
          })
        } else {
          variable.setValueForMode(modeId, resolved)
        }
      }
    }
    const stale = existing
      .filter(
        (variable) =>
          variable.variableCollectionId === group.collection.id &&
          !byName[variable.name],
      )
      .map((variable) => variable.name)
    if (stale.length > 0 && !settings.partial) {
      report.warnings.push(
        `${group.collection.name} has ${stale.length} variables this theme doesn't: ${stale.join(", ")}.`,
      )
    }
    report.collections.push({
      id: group.collection.id,
      modes: group.modes.map((mode) => mode.name),
      name: group.collection.name,
    })
  }

  const first = groups[0]
  const firstMode = first.modes[0].id
  const amount = (field) =>
    typeof field === "string" ? resolve(field, firstMode) || 0 : field

  if (settings.effects !== false) {
    const styles = await figma.getLocalEffectStylesAsync()
    for (const effect of theme.effects) {
      const style =
        styles.find((entry) => entry.name === effect.name) ||
        figma.createEffectStyle()
      style.name = effect.name
      style.description = effect.description
      style.effects = effect.layers.map((layer) => {
        const shade = resolve(layer.color, firstMode)
        let shadow = {
          blendMode: "NORMAL",
          color: shade ? color(shade) : { a: 0, b: 0, g: 0, r: 0 },
          offset: { x: amount(layer.x), y: amount(layer.y) },
          radius: amount(layer.blur),
          spread: amount(layer.spread),
          type: layer.inset ? "INNER_SHADOW" : "DROP_SHADOW",
          visible: true,
        }
        if (!layer.inset) shadow.showShadowBehindNode = false
        const bindings = [
          ["color", layer.color],
          ["offsetX", layer.x],
          ["offsetY", layer.y],
          ["radius", layer.blur],
          ["spread", layer.spread],
        ]
        for (const [field, name] of bindings) {
          const variable = typeof name === "string" && lookup(first, name)
          if (variable) {
            shadow = figma.variables.setBoundVariableForEffect(
              shadow,
              field,
              variable,
            )
          }
        }
        return shadow
      })
      report.effectStyles.push({ id: style.id, name: style.name })
    }
  }

  if (settings.text !== false) {
    const styles = await figma.getLocalTextStylesAsync()
    for (const text of theme.text) {
      const family = pickFamily(text.fonts)
      const fontName = { family, style: pickStyle(family, text.fontWeight) }
      await figma.loadFontAsync(fontName)
      const style =
        styles.find((entry) => entry.name === text.name) ||
        figma.createTextStyle()
      style.name = text.name
      style.description = text.description
      style.fontName = fontName
      style.fontSize = text.fontSize
      style.lineHeight =
        typeof text.lineHeight === "number"
          ? { unit: "PIXELS", value: text.lineHeight }
          : { unit: "AUTO" }
      style.letterSpacing = { unit: "PIXELS", value: text.letterSpacing }
      style.textCase = text.textCase
      for (const field of ["fontFamily", "fontSize", "fontWeight"]) {
        const name = text.variables[field]
        const variable = name && lookup(first, name)
        if (!variable) continue
        if (
          field === "fontFamily" &&
          stored(variable, first.ids[firstMode]) !== family
        ) {
          continue
        }
        try {
          style.setBoundVariable(field, variable)
        } catch (error) {
          report.warnings.push(
            `${text.name} keeps its own ${field}: ${error && error.message}`,
          )
        }
      }
      report.textStyles.push({ id: style.id, name: style.name })
    }
  }

  return report
}
