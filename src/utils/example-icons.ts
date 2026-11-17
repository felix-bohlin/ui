import { exampleTheme } from "./example-themes"
import { themeStore, type Theme } from "./theme"
import { iconLibraryOf } from "./theme-icons"

export const DEFAULT_ICON_LIBRARY = "fluent"

export const themeIconLibrary = ({ preset, tokens }: Theme) =>
  iconLibraryOf({ ...exampleTheme(preset)?.tokens, ...tokens }) ??
  DEFAULT_ICON_LIBRARY

type Original = { attributes: [string, string][]; children: Node[] }

const originals = new WeakMap<Element, Original>()

const clear = (svg: Element) => {
  while (svg.attributes.length > 0) {
    svg.removeAttribute(svg.attributes[0]!.name)
  }
}

const restore = (svg: Element, { attributes, children }: Original) => {
  clear(svg)
  for (const [name, value] of attributes) svg.setAttribute(name, value)
  svg.replaceChildren(...children.map((child) => child.cloneNode(true)))
}

export const showIcon = (svg: Element, markup: string | undefined) => {
  const original = originals.get(svg) ?? {
    attributes: [...svg.attributes].map(({ name, value }): [string, string] => [
      name,
      value,
    ]),
    children: [...svg.childNodes].map((child) => child.cloneNode(true)),
  }
  if (originals.has(svg)) restore(svg, original)
  if (!markup) {
    originals.delete(svg)
    return
  }
  const template = document.createElement("template")
  template.innerHTML = markup
  const icon = template.content.firstElementChild
  if (!icon) return
  originals.set(svg, original)
  const kept = new Map(original.attributes)
  for (const name of ["height", "width"]) {
    const value = kept.get(name)
    if (value === undefined) icon.removeAttribute(name)
    else icon.setAttribute(name, value)
  }
  for (const [name, value] of original.attributes) {
    if (name === "class") {
      icon.setAttribute(
        name,
        [icon.getAttribute(name), value].filter(Boolean).join(" "),
      )
    } else if (/^(aria-|data-|role$)/.test(name)) {
      icon.setAttribute(name, value)
    }
  }
  clear(svg)
  for (const { name, value } of icon.attributes) svg.setAttribute(name, value)
  svg.replaceChildren(...icon.childNodes)
}

const SELECTOR = "svg[data-icon]"

let shown = DEFAULT_ICON_LIBRARY
let observer: MutationObserver | undefined

const showLibrary = async (library: string) => {
  if (library === shown) return
  shown = library
  const libraries: Record<string, Record<string, string>> = library ===
  DEFAULT_ICON_LIBRARY
    ? {}
    : (await import("./icon-samples.json")).default
  const samples = libraries[library]
  if (shown !== library) return
  const show = (svg: Element) =>
    showIcon(svg, samples?.[svg.getAttribute("data-icon") ?? ""])
  observer?.disconnect()
  observer = undefined
  document.querySelectorAll(SELECTOR).forEach(show)
  if (!samples) return
  observer = new MutationObserver((records) => {
    for (const { addedNodes } of records) {
      for (const node of addedNodes) {
        if (!(node instanceof Element)) continue
        if (node.matches(SELECTOR)) show(node)
        else node.querySelectorAll(SELECTOR).forEach(show)
      }
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

export const followThemeIcons = () => {
  void showLibrary(themeIconLibrary(themeStore.get()))
  return themeStore.subscribe((theme) => {
    void showLibrary(themeIconLibrary(theme))
  })
}
