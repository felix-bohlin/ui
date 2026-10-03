import { features } from "web-features"

export async function getBaselineMappings() {
  const modules = import.meta.glob("../docs/components/*.astro", {
    query: "raw",
    import: "default",
    eager: true,
  })

  const featureToComponents: Record<string, { name: string; slug: string }[]> =
    {}
  const componentToFeatures: Record<string, string[]> = {}

  for (const path in modules) {
    const slug = path.split("/").pop()?.replace(".astro", "") || ""
    const name = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    const content = modules[path] as string
    const baselineRegex =
      /<(?:Baseline|BrowserSupport|Component)[\s\S]*?(?:ids|browserSupport)=\{([\s\S]*?)\}/g
    let match

    const featuresInComponent: string[] = []

    while ((match = baselineRegex.exec(content)) !== null) {
      const idString = match[1]
      const idArrayMatch = idString.match(/\[([\s\S]*?)\]/)
      if (idArrayMatch) {
        const individualIds = idArrayMatch[1]
          .split(",")
          .map((id) => id.trim().replace(/['"`]/g, ""))
          .filter(Boolean)

        individualIds.forEach((id) => {
          featuresInComponent.push(id)
          if (!featureToComponents[id]) {
            featureToComponents[id] = []
          }
          if (!featureToComponents[id].some((c) => c.slug === slug)) {
            featureToComponents[id].push({ name, slug })
          }
        })
      }
    }

    if (featuresInComponent.length > 0) {
      componentToFeatures[name] = Array.from(new Set(featuresInComponent))
    }
  }

  Object.values(featureToComponents).forEach((list) =>
    list.sort((a, b) => a.name.localeCompare(b.name)),
  )

  return { featureToComponents, componentToFeatures }
}

export async function getCategorizedBaselineIds() {
  const { featureToComponents } = await getBaselineMappings()
  const ids = Object.keys(featureToComponents)

  const categories: Record<string, string[]> = {
    limited: [],
    all: [],
  }

  ids.forEach((id) => {
    const feature = (features as Record<string, any>)[id]
    categories.all.push(id)
    const year = feature?.status?.baseline
      ? feature.status.baseline_low_date?.match(/\d{4}/)?.[0]
      : undefined

    if (!year) {
      categories.limited.push(id)
    } else {
      if (!categories[year]) {
        categories[year] = []
      }
      categories[year].push(id)
    }
  })

  return categories
}
