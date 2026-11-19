import {
  StrictMode,
  act,
  createElement,
  memo,
  useState,
  type ReactNode,
} from "react"
import { createRoot } from "react-dom/client"
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest"
import ToggleGroup from "../../packages/opui/components/ToggleGroup/ToggleGroup.react"
import {
  ToggleGroupContext,
  useToggleGroupContext,
} from "../../packages/opui/components/ToggleGroup/context.react"
import type { Context } from "../../packages/opui/components/ToggleGroup/types"

type Stub = {
  childNodes: Stub[]
  parentNode: Stub | null
  [key: string]: unknown
}

const documentStub = () => {
  const nodeOf = (nodeType: number, nodeName: string): Stub => {
    const node: Stub = {
      addEventListener: () => {},
      appendChild: (child: Stub) => {
        child.parentNode = node
        node.childNodes.push(child)
        return child
      },
      childNodes: [],
      insertBefore: (child: Stub, before: Stub) => {
        child.parentNode = node
        node.childNodes.splice(node.childNodes.indexOf(before), 0, child)
        return child
      },
      namespaceURI: "http://www.w3.org/1999/xhtml",
      nodeName,
      nodeType,
      ownerDocument: undefined,
      parentNode: null,
      removeAttribute: () => {},
      removeChild: (child: Stub) => {
        child.parentNode = null
        node.childNodes.splice(node.childNodes.indexOf(child), 1)
        return child
      },
      removeEventListener: () => {},
      setAttribute: () => {},
      style: {},
      tagName: nodeName,
      textContent: "",
    }
    return node
  }
  const document = nodeOf(9, "#document")
  const elementOf = (tag: string) => {
    const element = nodeOf(1, tag.toUpperCase())
    element.ownerDocument = document
    return element
  }
  document.activeElement = null
  document.body = elementOf("body")
  document.createElement = elementOf
  document.defaultView = { document, HTMLIFrameElement: class {} }
  return { container: elementOf("div") }
}

const inputOf = (value: string, checked: boolean, group: object[]) => {
  const input = {
    checked,
    closest: () => ({ querySelectorAll: () => group }),
    name: "format",
    value,
  }
  group.push(input)
  return input as unknown as HTMLInputElement
}

const mounted: { unmount: () => void }[] = []

const mount = (group: (consumer: ReactNode) => ReactNode) => {
  const seen = { context: undefined as Context | undefined, renders: 0 }
  let renderParent = () => {}
  const Consumer = memo(function Consumer() {
    seen.context = useToggleGroupContext()
    seen.renders++
    return null
  })
  const consumer = createElement(Consumer)
  const Parent = () => {
    const [, setTick] = useState(0)
    renderParent = () => setTick((tick) => tick + 1)
    return group(consumer)
  }
  const root = createRoot(documentStub().container as unknown as Element)
  mounted.push(root)
  act(() => root.render(createElement(StrictMode, null, createElement(Parent))))
  return {
    change: (input: HTMLInputElement) => act(() => seen.context?.change(input)),
    renderParent: () => act(() => renderParent()),
    seen,
  }
}

beforeAll(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true)
  vi.stubGlobal("window", {})
})

afterAll(() => {
  vi.unstubAllGlobals()
})

afterEach(() => {
  for (const root of mounted.splice(0)) act(() => root.unmount())
})

describe("the context a React ToggleGroup provides", () => {
  test("StrictMode renders the consumer twice in the development build, and a provider with an object literal renders it again with its parent", () => {
    const { renderParent, seen } = mount((consumer) =>
      createElement(
        ToggleGroupContext,
        {
          value: { change: () => {}, groupName: "format", inputType: "radio" },
        },
        consumer,
      ),
    )
    expect(seen.renders).toBe(2)
    renderParent()
    expect(seen.renders).toBe(4)
  })

  test("a memoized consumer skips a render of the group's parent, renders when the selection changes, and onValueChange is called once per change", () => {
    const onValueChange = vi.fn<(value: string) => void>()
    const { change, renderParent, seen } = mount((consumer) =>
      createElement(
        ToggleGroup,
        { "aria-label": "Format", defaultValue: "bold", onValueChange },
        consumer,
      ),
    )
    const first = seen.context
    expect(seen.renders).toBe(2)
    expect(first?.value).toBe("bold")
    renderParent()
    renderParent()
    expect(seen.renders).toBe(2)
    expect(seen.context).toBe(first)
    change(inputOf("italic", true, []))
    expect(seen.renders).toBe(4)
    expect(seen.context?.value).toBe("italic")
    expect(onValueChange.mock.calls).toEqual([["italic"]])
    change(inputOf("bold", true, []))
    expect(seen.context?.value).toBe("bold")
    expect(onValueChange.mock.calls).toEqual([["italic"], ["bold"]])
    renderParent()
    expect(seen.renders).toBe(6)
  })

  test("a multiple group does the same with the list of checked values", () => {
    const onValueChange = vi.fn<(value: string[]) => void>()
    const { change, renderParent, seen } = mount((consumer) =>
      createElement(
        ToggleGroup,
        {
          "aria-label": "Format",
          defaultValue: ["bold"],
          multiple: true,
          onValueChange,
        },
        consumer,
      ),
    )
    const first = seen.context
    expect(seen.renders).toBe(2)
    expect(first?.inputType).toBe("checkbox")
    renderParent()
    expect(seen.renders).toBe(2)
    expect(seen.context).toBe(first)
    const group: object[] = []
    const bold = inputOf("bold", true, group)
    const italic = inputOf("italic", true, group)
    change(italic)
    expect(seen.renders).toBe(4)
    expect(seen.context?.value).toEqual(["bold", "italic"])
    expect(onValueChange.mock.calls).toEqual([[["bold", "italic"]]])
    bold.checked = false
    change(bold)
    expect(seen.context?.value).toEqual(["italic"])
    expect(onValueChange.mock.calls).toEqual([
      [["bold", "italic"]],
      [["italic"]],
    ])
    renderParent()
    expect(seen.renders).toBe(6)
  })
})
