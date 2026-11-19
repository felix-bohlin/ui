import {
  type ComponentType,
  type Context as ReactContext,
  Fragment,
  Profiler,
  StrictMode,
  act,
  createContext,
  createElement,
  memo,
  use,
  useMemo,
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
import ts from "typescript"
import handWritten from "../../scripts/hand-written-components.json"
import ToggleGroup from "../../packages/opui/components/ToggleGroup/ToggleGroup.react"
import {
  ToggleGroupContext,
  useToggleGroupContext,
} from "../../packages/opui/components/ToggleGroup/context.react"
import { apis, casesOf, partCasesOf, reactProps } from "./component-cases"
import { contentOf, reactNodes } from "./renderers"

const sources = import.meta.glob<string>(
  "../../packages/opui/components/*/*.react.tsx",
  { eager: true, import: "default", query: "?raw" },
)
const modules = import.meta.glob<Record<string, unknown>>(
  "../../packages/opui/components/**/*.{ts,tsx}",
)

const COMPONENTS = "../../packages/opui/components/"

const UNEXERCISED: Record<string, string> = {}

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
      style: { setProperty: () => {} },
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
  document.createElementNS = (_: string, tag: string) => elementOf(tag)
  document.createTextNode = (text: string) => {
    const node = nodeOf(3, "#text")
    node.nodeValue = text
    node.ownerDocument = document
    return node
  }
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

const mount = <T>(read: () => T, tree: (consumer: ReactNode) => ReactNode) => {
  const seen = {
    commits: 0,
    context: undefined as T | undefined,
    renders: 0,
    values: [] as T[],
  }
  let renderParent = () => {}
  const Consumer = memo(function Consumer() {
    seen.context = read()
    seen.values.push(seen.context)
    seen.renders++
    return null
  })
  const consumer = createElement(Consumer)
  const Parent = () => {
    const [, setTick] = useState(0)
    renderParent = () => setTick((tick) => tick + 1)
    return createElement(
      Profiler,
      { id: "provider", onRender: () => seen.commits++ },
      tree(consumer),
    )
  }
  const root = createRoot(documentStub().container as unknown as Element)
  mounted.push(root)
  act(() => root.render(createElement(StrictMode, null, createElement(Parent))))
  return {
    renderParent: () => act(() => renderParent()),
    seen,
  }
}

const mountGroup = (group: (consumer: ReactNode) => ReactNode) => {
  const { renderParent, seen } = mount(useToggleGroupContext, group)
  return {
    change: (input: HTMLInputElement) => act(() => seen.context?.change(input)),
    renderParent,
    seen,
  }
}

type Provider = {
  component: string
  context: ReactContext<unknown>
  contextName: string
  file: string
  load: () => Promise<ComponentType<Record<string, unknown>>>
}

const isContext = (value: unknown): value is ReactContext<unknown> =>
  (value as { $$typeof?: symbol } | undefined)?.$$typeof ===
  Symbol.for("react.context")

const readTags = (source: string) => {
  const file = ts.createSourceFile(
    "Component.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  const created = new Set<string>()
  const imports = new Map<string, { name: string; specifier: string }>()
  const tags = new Map<string, boolean>()
  const visit = (node: ts.Node) => {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      node.importClause &&
      !node.importClause.isTypeOnly
    ) {
      const specifier = node.moduleSpecifier.text
      const { name, namedBindings } = node.importClause
      if (name) imports.set(name.text, { name: "default", specifier })
      if (namedBindings && ts.isNamedImports(namedBindings)) {
        for (const element of namedBindings.elements) {
          if (element.isTypeOnly) continue
          imports.set(element.name.text, {
            name: (element.propertyName ?? element.name).text,
            specifier,
          })
        }
      }
    }
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      ts.isCallExpression(node.initializer) &&
      /(^|\.)createContext$/.test(node.initializer.expression.getText(file))
    ) {
      created.add(node.name.text)
    }
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const [name, member, ...deeper] = node.tagName.getText(file).split(".")
      if (/^[A-Z]/.test(name) && !deeper.length) {
        if (member === "Provider") tags.set(name, true)
        else if (!member && !tags.has(name)) tags.set(name, false)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(file)
  return { created, imports, tags }
}

const moduleOf = (path: string, specifier: string) => {
  const base = new URL(specifier, new URL(path, "file:///a/b/")).pathname
  return ["", ".ts", ".tsx", "/index.ts"]
    .map((extension) => `../..${base.replace("/a/b/../..", "")}${extension}`)
    .find((candidate) => candidate in modules)
}

const providedBy = async (
  path: string,
  source: string,
  load: (path: string) => Promise<Record<string, unknown>>,
) => {
  const { created, imports, tags } = readTags(source)
  const file = path.replace(COMPONENTS, "")
  const contexts: { context: ReactContext<unknown>; contextName: string }[] = []
  const problems: string[] = []
  for (const [name, provider] of tags) {
    const imported = imports.get(name)
    if (created.has(name)) {
      const own = (await load(path))[name]
      if (isContext(own)) contexts.push({ context: own, contextName: name })
      else {
        problems.push(
          `${file} provides ${name}, which it creates and doesn't export, so no test can read it: create the context in a context.react.ts file and export it`,
        )
      }
      continue
    }
    const module = imported?.specifier.startsWith(".")
      ? moduleOf(path, imported.specifier)
      : undefined
    if (!imported || !module) {
      if (provider) {
        problems.push(
          `${file} renders <${name}.Provider> and the test can't find the context ${name}: import it from a file in packages/opui/components`,
        )
      }
      continue
    }
    const value = (await load(module))[imported.name]
    if (isContext(value)) contexts.push({ context: value, contextName: name })
    else if (provider) {
      problems.push(
        `${file} renders <${name}.Provider> and ${imported.specifier} exports no context named ${imported.name}`,
      )
    }
  }
  return { contexts, problems }
}

const discover = async () => {
  const providers: Provider[] = []
  const problems: string[] = []
  for (const path of Object.keys(sources).toSorted()) {
    const found = await providedBy(path, sources[path], (module) =>
      modules[module](),
    )
    problems.push(...found.problems)
    for (const { context, contextName } of found.contexts) {
      providers.push({
        component: path.split("/").at(-1)!.replace(".react.tsx", ""),
        context,
        contextName,
        file: path.replace(COMPONENTS, ""),
        load: async () =>
          (await modules[path]()).default as ComponentType<
            Record<string, unknown>
          >,
      })
    }
  }
  return { problems, providers }
}

const DISCOVERED = await discover()

const CASES = Map.groupBy(
  Object.values(apis).flatMap((api) => [...casesOf(api), ...partCasesOf(api)]),
  ({ component }) => component,
)

const MINIMAL = { name: "nothing", props: {} }

const describeError = (error: unknown) =>
  error instanceof Error ? error.message.split("\n")[0] : String(error)

const unstable = (
  { component, context, contextName, file }: Omit<Provider, "load">,
  Component: ComponentType<Record<string, unknown>>,
  name: string,
  props: Record<string, unknown>,
) => {
  const element = (consumer: ReactNode) =>
    createElement(
      Component,
      props,
      createElement(Fragment, null, consumer, props.children as ReactNode),
    )
  const where = `${file} with ${name}`
  try {
    const { renderParent, seen } = mount(() => use(context), element)
    if (!seen.renders) {
      return `${where}: the test can't exercise ${contextName}, since ${component} never rendered its children, where the consumer of the context sits. Render the default slot inside the provider, or list the file in UNEXERCISED with the reason`
    }
    const first = seen.context
    if (typeof first !== "object" || first === null) {
      return `${where}: the test can't exercise ${contextName}, since the consumer inside ${component} read ${String(first)}, not the object the provider builds`
    }
    const { commits, renders } = seen
    renderParent()
    renderParent()
    if (seen.commits === commits) {
      return `${where}: the test can't exercise ${contextName}, since ${component} didn't render again with its parent`
    }
    if (seen.values.slice(renders).some((value) => !Object.is(value, first))) {
      return `${where}: the value ${component} provides as ${contextName} changed between two renders with the same props, so a dependency of its useMemo is new on every render (an object, an array or a function built in the component body, also by a call) and every consumer renders again with the provider. Depend on the primitives it reads, or build it in its own useMemo or useCallback; for a compiled file, change the .astro source, or make toReact in scripts/component-react.mjs refuse the construct`
    }
    return undefined
  } catch (error) {
    return `${where}: the test can't render ${component} to read ${contextName} (${describeError(error)}). Add the DOM member React reads to documentStub, or list the file in UNEXERCISED with the reason`
  } finally {
    for (const root of mounted.splice(0)) act(() => root.unmount())
  }
}

const variantsOf = (component: string) =>
  CASES.get(component)?.map((entry) => ({
    name: entry.name,
    props: reactProps(entry, () => reactNodes(contentOf(component))),
  })) ?? [MINIMAL]

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
    const { renderParent, seen } = mountGroup((consumer) =>
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
    const { change, renderParent, seen } = mountGroup((consumer) =>
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
    const { change, renderParent, seen } = mountGroup((consumer) =>
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

const SampleContext = createContext<{ label: unknown } | undefined>(undefined)

const SAMPLE = {
  component: "Sample",
  context: SampleContext as ReactContext<unknown>,
  contextName: "SampleContext",
  file: "Sample/Sample.react.tsx",
}

const labelOf = (name: string) => ({ text: name })

const sampleOf =
  (read: (name: string) => unknown) =>
  ({ children, name = "a" }: { children?: ReactNode; name?: string }) => {
    const label = read(name)
    const context = useMemo(() => ({ label }), [label])
    return createElement(SampleContext, { value: context }, children)
  }

describe("the context every React provider gives its consumers", () => {
  test("finds the providers in the component files, each with the context it provides", () => {
    expect(DISCOVERED.problems).toEqual([])
    expect(
      DISCOVERED.providers.map(({ file }) => file),
      "the React ToggleGroup provides ToggleGroupContext: the discovery no longer reads the component files",
    ).toContain("ToggleGroup/ToggleGroup.react.tsx")
    expect(
      Object.keys(handWritten)
        .filter((file) => file.endsWith(".react.tsx"))
        .filter((file) => !(`${COMPONENTS}${file}` in sources)),
      "a hand-written React file in scripts/hand-written-components.json is not among the files the discovery reads",
    ).toEqual([])
    expect(
      Object.keys(UNEXERCISED).filter(
        (file) =>
          !DISCOVERED.providers.some((provider) => provider.file === file),
      ),
      "UNEXERCISED names a file that provides no context; delete it",
    ).toEqual([])
  })

  test.each(DISCOVERED.providers)(
    "$file gives $contextName the same value when it renders again with the same props",
    async ({ load, ...provider }) => {
      const Component = await load()
      const variants = variantsOf(provider.component)
      const problems = variants.flatMap(
        ({ name, props }) => unstable(provider, Component, name, props) ?? [],
      )
      const reason = UNEXERCISED[provider.file]
      if (reason) {
        expect(
          problems.filter((problem) => problem.includes("the test can't")),
          `${provider.file} is in UNEXERCISED (${reason}) but the test renders it and reads ${provider.contextName}; delete it`,
        ).not.toEqual([])
        return
      }
      expect(variants.length).toBeGreaterThan(0)
      expect(problems).toEqual([])
    },
  )

  test("a sample the check must flag: a provider in a file the discovery can't follow to its context", async () => {
    const load = async () => ({ Known: SampleContext })
    const local = await providedBy(
      `${COMPONENTS}Sample/Sample.react.tsx`,
      'import { createContext } from "react"\nconst Local = createContext(undefined)\nexport default function Sample({ children }) {\n  return <Local value={1}>{children}</Local>\n}\n',
      async () => ({}),
    )
    expect(local.contexts).toEqual([])
    expect(local.problems).toEqual([
      expect.stringContaining("Sample/Sample.react.tsx provides Local"),
    ])
    const foreign = await providedBy(
      `${COMPONENTS}Sample/Sample.react.tsx`,
      'import { Theme } from "some-package"\nexport default function Sample({ children }) {\n  return <Theme.Provider value={1}><Other /></Theme.Provider>\n}\n',
      load,
    )
    expect(foreign.problems).toEqual([
      expect.stringContaining("can't find the context Theme"),
    ])
    const exported = await providedBy(
      `${COMPONENTS}Sample/Sample.react.tsx`,
      'import { createContext } from "react"\nexport const Known = createContext(undefined)\nexport default function Sample({ children }) {\n  return <Known.Provider value={1}>{children}</Known.Provider>\n}\n',
      load,
    )
    expect(exported).toEqual({
      contexts: [{ context: SampleContext, contextName: "Known" }],
      problems: [],
    })
  })

  test("a sample the check must flag: a memo that depends on a local built by a call that returns a new object", () => {
    expect(unstable(SAMPLE, sampleOf(labelOf), "nothing", {})).toContain(
      "Sample/Sample.react.tsx with nothing: the value Sample provides as SampleContext changed between two renders with the same props",
    )
    expect(
      unstable(
        SAMPLE,
        sampleOf((name) => `${name}-title`),
        "nothing",
        {},
      ),
    ).toBeUndefined()
  })

  test("a sample the check must flag: an object literal as the value, and a provider that drops its children", () => {
    expect(
      unstable(
        SAMPLE,
        ({ children }: { children?: ReactNode }) =>
          createElement(SampleContext, { value: { label: "a" } }, children),
        "nothing",
        {},
      ),
    ).toContain("changed between two renders with the same props")
    expect(
      unstable(
        SAMPLE,
        () => createElement(SampleContext, { value: undefined }),
        "nothing",
        {},
      ),
    ).toContain("never rendered its children")
    expect(
      unstable(
        SAMPLE,
        () => {
          throw new Error("no DOM")
        },
        "nothing",
        {},
      ),
    ).toContain("the test can't render Sample to read SampleContext (no DOM)")
  })
})
