import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { FRAMEWORKS, HYDRATED_FRAMEWORK_IDS } from "../src/utils/framework.js"
import { devOnly, groupWarning, selectionImport } from "./component-emit.mjs"
import { loadApis, readComponent } from "./component-reader.mjs"
import {
  byName,
  isArrayType,
  root,
  unionMembers,
  unsupported,
} from "./component-shared.mjs"

export const isCheckedAttribute = (entry) =>
  entry.kind === "expression" && entry.name === "checked"

const arrayValue = (model) => unionMembers(model.type).some(isArrayType)

const optionalModel = (model, name) =>
  `const ${name} = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`

const report = (model, callback, multiple, selected) =>
  arrayValue(model)
    ? `if (${multiple}) ${callback}?.(checkedValues(input, ${selected}))\n  else ${callback}?.(input.value)`
    : `${callback}?.(${model.read})`

const BOUND = "const bound = useBound()"

const DEV_WARNING = [
  ["../dev", "DEV"],
  ["../dev", "warnGroupedChecked"],
]

const NOTHING = {}

const checkedOf = (node) => node.attributes.find(isCheckedAttribute)

const solidControl = (model) => ({
  attributes: (node) =>
    node === model.element
      ? {
          rest: [
            "{...checkedControl.server}",
            "ref={[props.ref, checkedControl.ref]}",
          ],
        }
      : {},
  declares: ["checkedControl"],
  helpers: { called: { control: "../solid" } },
  props: { added: ["checked", "ref"] },
  script: () => ({
    before: ["const checkedControl = control(() => props.checked)"],
  }),
})

const vueModel = (model, attributes, name) => ({
  attributes: (node) =>
    node === model.element ? { bound: { attributes, condition: "bound" } } : {},
  declares: ["bound", name],
  helpers: { called: { useBound: "../vue" } },
  script: () => ({ before: [optionalModel(model, name), BOUND] }),
})

const svelteRelay = (model, { added, attributes, helpers, script }) => ({
  attributes: (node) => (node === model.element ? { end: attributes } : {}),
  declares: ["initialChecked", "relay"],
  helpers: {
    called: { relayChecked: "../svelte", ...helpers, untrack: "svelte" },
  },
  props: { added, bound: model.bindables },
  script: () => ({ before: script }),
})

const checked = ({ model }) => ({
  react: NOTHING,
  solid: solidControl(model),
  svelte: svelteRelay(model, {
    added: ["defaultChecked", "value"],
    attributes: [
      "{@attach relayChecked(\n  relay,\n  () => checked,\n  () =>\n    group === undefined || value === undefined\n      ? undefined\n      : group.includes(value),\n)}",
      "defaultChecked={defaultChecked ?? initialChecked}",
      "{value}",
    ],
    helpers: { toggleInGroup: "../group" },
    script: [
      "const initialChecked = untrack(() =>\n  group !== undefined && value !== undefined\n    ? group.includes(value)\n    : checked,\n)",
      "const relay = (input: HTMLInputElement) => {\n  checked = input.checked\n  if (value !== undefined) {\n    group = toggleInGroup(group ?? [], value, input.checked)\n  }\n}",
    ],
  }),
  vue: vueModel(model, ['v-model="modelValue"'], "modelValue"),
})

const radio = ({ model }) => ({
  react: NOTHING,
  solid: solidControl(model),
  svelte: svelteRelay(model, {
    added: ["checked", "defaultChecked", "value"],
    attributes: [
      "{@attach relayChecked(\n  relay,\n  () => checked ?? undefined,\n  () => (group === undefined ? undefined : group === (value ?? true)),\n)}",
      "defaultChecked={defaultChecked ?? initialChecked}",
      "{value}",
    ],
    helpers: {},
    script: [
      "const initialChecked = untrack(() =>\n  group !== undefined ? group === (value ?? true) : checked,\n)",
      "const relay = (input: HTMLInputElement) => {\n  if (input.checked) group = value ?? true\n  else if (group === (value ?? true)) group = undefined\n}",
    ],
  }),
  vue: vueModel(
    model,
    [':value="attrs.value"', 'v-model="modelValue"'],
    "modelValue",
  ),
})

const forward = ({ model }) => ({
  react: NOTHING,
  solid: NOTHING,
  svelte: {
    attributes: (node) =>
      node === model.element
        ? { end: model.bindables.map(({ prop }) => `bind:${prop}`) }
        : {},
    props: { bound: model.bindables },
  },
  vue: vueModel(model, ['v-model="model"'], "model"),
})

const controlled = (model) => ({
  added: ["defaultValue", "onValueChange"],
  initial: [[model.prop, "defaultValue"]],
})

const group = (component) => {
  const { model } = component
  const provided = component.provide?.value ?? []
  const generic = arrayValue(model)
  const members = unionMembers(model.type)
  return {
    react: {
      context: [
        { code: "change", key: "change" },
        { code: "defaultValue", key: "defaultValue" },
        ...provided,
      ],
      declares: ["change"],
      helpers: {
        called: {
          checkedValues: selectionImport(component),
          useCallback: "react",
        },
      },
      props: controlled(model),
      script: () => ({
        before: [
          `const change = useCallback(\n  (input: HTMLInputElement) => {\n  ${report(model, "onValueChange", "multiple", model.local)}\n},\n  [${generic ? `multiple, onValueChange, ${model.local}` : "onValueChange"}],\n)`,
        ],
      }),
    },
    solid: {
      context: [
        { code: "change", key: "change" },
        { code: "props.defaultValue", key: "defaultValue" },
        ...provided,
      ],
      declares: ["change"],
      helpers: { called: { checkedValues: selectionImport(component) } },
      props: controlled(model),
      script: () => ({
        before: [
          `const change = (input: HTMLInputElement) => {\n  ${report(model, "props.onValueChange", "props.multiple", `props.${model.prop}`)}\n}`,
        ],
      }),
    },
    svelte: {
      context: [
        {
          key: "change",
          text: `change(input) {\nif (input.checked${generic ? ' || input.type === "checkbox"' : ""}) ${model.prop} = ${model.read}\nelse if (${model.prop} === input.value) ${model.prop} = undefined\n},`,
        },
        ...provided,
      ],
      helpers: { called: { selectionOf: selectionImport(component) } },
      props: { bound: model.bindables },
    },
    vue: {
      context: [
        { key: "bound", text: "bound" },
        ...provided.map((entry) =>
          entry.key === model.prop
            ? { key: entry.key, text: `${entry.key}: model` }
            : entry,
        ),
      ],
      declares: ["bound", "model"],
      generic: generic
        ? {
            parameter: "Multiple extends boolean = false",
            props: "{ multiple?: Multiple }",
            type: `type Model = Multiple extends true ? ${members.filter(isArrayType).join(" | ")} : ${members.filter((member) => !isArrayType(member)).join(" | ")}`,
          }
        : undefined,
      helpers: { called: { useBound: "../vue" } },
      props: {
        added: generic ? ["multiple"] : [],
        dropped: [model.prop],
        initial: [[model.prop, "modelValue"]],
      },
      script: () => ({
        before: [
          `const model = defineModel<${generic ? "Model" : model.type}>()`,
          BOUND,
        ],
      }),
    },
  }
}

const radioGroup = ({ model }) => {
  const radioOf = (node, port) => {
    const value = model.radios.get(node)
    return value === undefined
      ? undefined
      : {
          checked: port.rewrite(checkedOf(node).code),
          value: port.rewrite(value),
        }
  }
  return {
    react: {
      attributes: (node, port) => {
        const radio = radioOf(node, port)
        return radio
          ? {
              checked: [
                `checked={${model.local} !== undefined ? ${radio.checked} : undefined}`,
                `defaultChecked={${model.local} !== undefined ? undefined : ${radio.checked}}`,
                `onChange={() => onValueChange?.(${radio.value})}`,
              ],
            }
          : {}
      },
      props: controlled(model),
      rename: [[model.local, `${model.local} ?? defaultValue`]],
    },
    solid: {
      attributes: (node, port) => {
        const radio = radioOf(node, port)
        if (!radio) return {}
        const control = port.control(
          `() => props.${model.prop} === undefined ? undefined : ${radio.checked}`,
          `props.${model.prop} === undefined ? ${radio.checked} : undefined`,
        )
        return {
          checked: [
            `{...${control}.server}`,
            `onChange={() => props.onValueChange?.(${radio.value})}`,
            `ref={${control}.ref}`,
          ],
        }
      },
      helpers: { called: { control: "../solid" } },
      props: controlled(model),
      rename: [[model.local, `props.${model.prop} ?? props.defaultValue`]],
    },
    svelte: {
      attributes: (node, port) => {
        const radio = radioOf(node, port)
        return radio
          ? {
              checked: [],
              end: [
                `defaultChecked={untrack(() => ${radio.checked})}`,
                `{@attach relayChecked(\n  (input) => {\n    if (input.checked) ${model.local} = ${radio.value}\n    else if (${radio.checked}) ${model.local} = undefined\n  },\n  () => (${model.local} === undefined ? undefined : ${radio.checked}),\n)}`,
              ],
            }
          : {}
      },
      helpers: { called: { relayChecked: "../svelte", untrack: "svelte" } },
      props: { bound: [{ prop: model.prop, type: model.type }] },
    },
    vue: {
      attributes: (node) =>
        model.radios.has(node)
          ? {
              bound: {
                attributes: ['v-model="modelValue"'],
                condition: "bound",
              },
              checked: [],
            }
          : {},
      declares: ["bound", "model", "modelValue"],
      helpers: { called: { useBound: "../vue" } },
      rename: [[model.local, "model.value"]],
      script: () => ({
        before: [
          `const modelValue = defineModel<${model.type}>()`,
          BOUND,
          `const model = computed(() => modelValue.value ?? ${model.local})`,
        ],
      }),
    },
  }
}

const groupItem = (component, model) => {
  const { item } = component
  const change = (call) =>
    `onChange={(event) => {\n  ${item.parent}?.change?.(event.currentTarget)\n  ${call}\n}}`
  const target = model
    ? `const target = computed({\n  get: () => (${item.parent}?.bound ? ${item.parent}.value : model.value),\n  set: (next) => {\n    if (${item.parent}?.bound) ${item.parent}.value = next as typeof ${item.parent}.value\n    else model.value = next as typeof model.value\n  },\n})`
    : `const target = computed({\n  get: () => ${item.parent}?.value,\n  set: (next) => {\n    if (${item.parent}) ${item.parent}.value = next\n  },\n})`
  return {
    react: {
      attributes: (node, port) => {
        if (node !== item.input) return {}
        const defaultGrouped = port.rewrite(item.defaultGrouped)
        return {
          checked: [
            port.attribute(checkedOf(node)),
            `defaultChecked={${item.grouped} !== undefined ? undefined : ${item.checked ? `${item.checked} === undefined ? (${defaultGrouped} ?? defaultChecked) : defaultChecked` : `(${defaultGrouped} ?? defaultChecked)`}}`,
          ],
          end: ["ref={ref}", change("onChange?.(event)")],
        }
      },
      helpers: { always: DEV_WARNING },
      props: { added: ["defaultChecked", "onChange", "ref"] },
      script: () => ({
        after: [
          devOnly(
            groupWarning(
              component,
              item,
              `${item.checked ?? "undefined"} ?? defaultChecked`,
            ),
          ),
        ],
      }),
    },
    solid: {
      attributes: (node, port) => {
        if (node !== item.input) return {}
        const control = port.control(
          `() => ${port.rewrite(checkedOf(node).code)}`,
          `${port.rewrite(item.defaultGrouped)} ?? props.defaultChecked`,
        )
        return {
          checked: [`{...${control}.server}`],
          end: [
            `ref={[props.ref, ${control}.ref]}`,
            change("callHandler(props.onChange, event)"),
          ],
        }
      },
      helpers: {
        always: DEV_WARNING,
        called: {
          callHandler: "../solid",
          control: "../solid",
          untrack: "solid-js",
        },
      },
      props: { added: ["defaultChecked", "onChange", "ref"] },
      script: (rewrite) => ({
        after: [
          `if (DEV) untrack(() =>\n${groupWarning(
            component,
            item,
            `${rewrite(item.checked ?? "undefined")} ?? props.defaultChecked`,
            rewrite(item.grouped),
          )}\n)`,
        ],
      }),
    },
    svelte: {
      attributes: (node) =>
        node === item.input
          ? {
              checked: [
                "{@attach relayChecked(change, isChecked)}",
                `defaultChecked={${item.grouped} === undefined ? (defaultChecked ?? initialChecked) : initialChecked}`,
              ],
            }
          : {},
      declares: ["change", "initialChecked", "isChecked"],
      helpers: {
        always: DEV_WARNING,
        called: { relayChecked: "../svelte", untrack: "svelte" },
      },
      props: {
        added: ["defaultChecked"],
        bound: model ? model.bindables : [],
      },
      script: (rewrite) => ({
        after: [
          `if (DEV) untrack(() => ${groupWarning(component, item, `${item.checked ?? "undefined"} ?? defaultChecked`)})`,
          `const isChecked = () => ${rewrite(item.checkedCode)}`,
          "const initialChecked = untrack(() => isChecked() ?? !!defaultChecked)",
          `const change = (input: HTMLInputElement) => {\n${[
            ...(model
              ? [
                  `if (${item.grouped} === undefined) ${model.prop} = input.checked`,
                ]
              : []),
            item.value
              ? `if (${item.value} !== undefined) ${item.parent}?.change?.(input)`
              : `${item.parent}?.change?.(input)`,
          ]
            .map((line) => `  ${line}\n`)
            .join("")}}`,
        ],
      }),
    },
    vue: {
      attributes: (node) =>
        node === item.input
          ? {
              bound: {
                attributes: ['v-model="target"'],
                condition: model
                  ? `${item.parent}?.bound || bound`
                  : `${item.parent}?.bound`,
              },
              checked: [],
              rename:
                model && item.checked
                  ? [[item.checked, `model ?? ${item.checked}`]]
                  : [],
            }
          : {},
      declares: model ? ["bound", "model", "target"] : ["target"],
      helpers: {
        always: DEV_WARNING,
        called: {
          ...(model ? { useBound: "../vue" } : {}),
          watchEffect: "vue",
        },
      },
      props: { unset: item.checked ? ["checked"] : [] },
      script: () => ({
        after: [
          `if (DEV) watchEffect(() =>\n  ${groupWarning(
            component,
            item,
            model && item.checked
              ? `${item.checked} ?? model.value`
              : (item.checked ?? "undefined"),
            `${item.grouped}.value`,
          )},\n)`,
          target,
        ],
        before: model ? [optionalModel(model, "model"), BOUND] : [],
      }),
    },
  }
}

const none = () => ({
  react: NOTHING,
  solid: NOTHING,
  svelte: NOTHING,
  vue: NOTHING,
})

export const MODEL_KINDS = {
  checked,
  checkedItem: (component) => groupItem(component, component.model),
  forward,
  group,
  item: (component) => groupItem(component),
  none,
  radio,
  radioGroup,
}

const shapeOf = (parts, context, refusal) => ({
  attributes: (node, port) => ({
    bound: undefined,
    checked: undefined,
    end: [],
    rename: [],
    rest: [],
    ...parts.attributes?.(node, port),
  }),
  context: parts.context ?? context,
  declares: parts.declares ?? [],
  generic: parts.generic,
  helpers: { always: [], called: {}, ...parts.helpers },
  props: {
    added: [],
    bound: [],
    dropped: [],
    initial: [],
    unset: [],
    ...parts.props,
  },
  refusal,
  rename: parts.rename ?? [],
  script: (rewrite) => ({ after: [], before: [], ...parts.script?.(rewrite) }),
})

const kindOf = ({ item, model }) =>
  model ? model.kind : item ? "item" : "none"

export const bindingOf = (component) => {
  const kind = kindOf(component)
  const parts =
    component.model?.refusal || !(kind in MODEL_KINDS)
      ? undefined
      : MODEL_KINDS[kind](component)
  const lacking = parts
    ? HYDRATED_FRAMEWORK_IDS.find((framework) => !parts[framework])
    : undefined
  const refusal =
    component.model?.refusal ??
    (!parts || lacking
      ? unsupported(
          "BC402",
          component.file,
          `the ${kind} model kind, which has no ${lacking ? `${lacking} entry` : "entry"}`,
          "give the kind an entry for every framework in MODEL_KINDS in scripts/component-models.mjs, NOTHING where it adds nothing",
        )
      : undefined)
  return {
    kind,
    ...Object.fromEntries(
      HYDRATED_FRAMEWORK_IDS.map((framework) => [
        framework,
        shapeOf(
          refusal ? NOTHING : parts[framework],
          component.provide?.value ?? [],
          refusal,
        ),
      ]),
    ),
  }
}

const labelOf = (framework) =>
  FRAMEWORKS.find(({ id }) => id === framework).label

export const bindingFor = (component, framework) => {
  const binding = bindingOf(component)[framework]
  if (binding.refusal) throw binding.refusal
  const clash = binding.declares.find((name) => component.declared.has(name))
  if (clash) {
    throw unsupported(
      "BC301",
      component.file,
      `the name \`${clash}\`, which the ${labelOf(framework)} port also declares for its ${component.model ? `${component.model.prop} model` : "group item"}`,
      "rename the prop or const in the Astro file",
    )
  }
  return binding
}

export const helpersOf = (binding, own = {}) =>
  Object.fromEntries(
    Object.entries({ ...own, ...binding.helpers.called }).toSorted(([a], [b]) =>
      byName(a, b),
    ),
  )

export const helpersCalled = (code, helpers) =>
  Object.entries(helpers)
    .filter(([name]) => new RegExp(`(?<![\\w$.])${name}\\(`).test(code))
    .map(([name, module]) => ({ module, name }))

export const namesFrom = (used, module) =>
  used.filter((entry) => entry.module === module).map(({ name }) => name)

export const importLinesOf = (used, except) =>
  [...new Set(used.map(({ module }) => module))]
    .filter((module) => !except.includes(module))
    .map(
      (module) =>
        `import { ${namesFrom(used, module).join(", ")} } from "${module}"`,
    )

let bound

export const boundComponents = () =>
  (bound ??= (async () => {
    const apis = await loadApis()
    const entries = []
    for (const api of [...apis.values()].filter(({ model }) => model)) {
      const file = `packages/opui/components/${api.source}/${api.component}.astro`
      const component = await readComponent(
        await readFile(join(root, file), "utf8"),
        file,
        api,
      )
      entries.push([
        api.component,
        bindingOf({ ...component, name: api.component }),
      ])
    }
    return new Map(entries.toSorted(([a], [b]) => byName(a, b)))
  })())
