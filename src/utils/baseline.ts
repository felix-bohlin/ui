import { featureOf } from "../../packages/opui/scripts/features.mjs"
import { catalog } from "../component-api/catalog.glob"
import { componentName } from "./components"

export async function getBaselineMappings() {
  const featureToComponents: Record<string, { name: string; slug: string }[]> =
    {}
  const componentToFeatures: Record<string, string[]> = {}

  for (const slug of catalog.pages) {
    const name = componentName(slug)
    const featuresInComponent = catalog.featuresOf(slug)

    featuresInComponent.forEach((id) => {
      if (!featureToComponents[id]) {
        featureToComponents[id] = []
      }
      featureToComponents[id].push({ name, slug })
    })

    if (featuresInComponent.length > 0) {
      componentToFeatures[name] = featuresInComponent
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
    const feature = featureOf(id)
    const status = feature && "status" in feature ? feature.status : undefined
    categories.all.push(id)
    const year = status?.baseline
      ? status.baseline_low_date?.match(/\d{4}/)?.[0]
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
