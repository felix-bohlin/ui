import {
  createComponent as component,
  createMemo,
  createRenderEffect,
  flatten,
  merge,
  omit,
  untrack,
} from "solid-js"

type Element = {
  children: unknown[]
  props: Record<string, unknown>
  tag: string
}

type Source = object | (() => object)

const read = (source: Source) => {
  const props = typeof source === "function" ? source() : source
  return Object.fromEntries(
    Object.keys(props ?? {}).map((key) => [
      key,
      key === "children"
        ? flatten(Reflect.get(props, key))
        : Reflect.get(props, key),
    ]),
  )
}

export const createElement = (tag: string): Element => ({
  children: [],
  props: {},
  tag,
})

export const createTextNode = (text: string) => text

export const insertNode = (parent: Element, node: unknown) => {
  parent.children.push(node)
}

export const insert = (parent: Element, value: unknown) => {
  if (typeof value !== "function") return insertNode(parent, value)
  createRenderEffect(
    () => flatten(value()),
    (content) => {
      insertNode(parent, content)
    },
  )
}

export const setProp = (node: Element, name: string, value: unknown) => {
  node.props[name] = value
}

export const spread = (node: Element, sources: Source | Source[]) => {
  createRenderEffect(
    () => [sources].flat().map(read),
    (props) => {
      Object.assign(node.props, ...props)
    },
  )
}

export const effect = createRenderEffect

export const memo = createMemo

export const mergeProps = merge

export const createComponent = component

export const ref = (refs: () => unknown) => {
  untrack(refs)
}

export const dynamic =
  (source: () => unknown) => (props: Record<string, unknown>) =>
    createMemo(() => {
      const tag = source()
      if (typeof tag === "function") {
        return untrack(() => component(tag as never, props))
      }
      const node = createElement(String(tag))
      spread(node, props)
      return node
    })

export const Dynamic = (props: Record<string, unknown>) =>
  dynamic(() => props.component)(omit(props, "component"))
