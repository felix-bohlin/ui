import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { FRAMEWORKS, HYDRATED_FRAMEWORK_IDS } from "../src/utils/framework.js"
import { devOnly, groupWarning, selectionImport } from "./component-emit.mjs"
import {
  code,
  declaration,
  declaredIn,
  fragment,
  named,
  reads,
  uses,
} from "./component-fragment.ts"
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

const CALL_HANDLER = named("../solid", "callHandler")
const COMPUTED = named("vue", "computed")
const CONTROL = named("../solid", "control")
const DEV = named("../dev", "DEV")
const RELAY_CHECKED = named("../svelte", "relayChecked")
const SOLID_UNTRACK = named("solid-js", "untrack")
const SVELTE_UNTRACK = named("svelte", "untrack")
const USE_BOUND = named("../vue", "useBound")
const WATCH_EFFECT = named("vue", "watchEffect")

const optionalModel = (model, name) =>
  declaration(
    name,
    `const ${name} = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`,
  )

const report = (component, callback, multiple, selected) =>
  arrayValue(component.model)
    ? uses(
        `if (${multiple}) ${callback}?.(checkedValues(input, ${selected}))\n  else ${callback}?.(input.value)`,
        named(selectionImport(component), "checkedValues"),
      )
    : fragment(`${callback}?.(${component.model.read})`)

const BOUND = declaration("bound", uses("const bound = useBound()", USE_BOUND))

const NOTHING = {}

const checkedOf = (node) => node.attributes.find(isCheckedAttribute)

const solidControl = (model) => ({
  attributes: (node) =>
    node === model.element
      ? {
          rest: [
            reads("{...checkedControl.server}", "checkedControl"),
            reads("ref={[props.ref, checkedControl.ref]}", "checkedControl"),
          ],
        }
      : {},
  props: { added: ["checked", "ref"] },
  script: () => ({
    before: [
      declaration(
        "checkedControl",
        uses("const checkedControl = control(() => props.checked)", CONTROL),
      ),
    ],
  }),
})

const vueModel = (model, attributes, name) => ({
  attributes: (node) =>
    node === model.element ? { bound: { attributes, condition: "bound" } } : {},
  script: () => ({ before: [optionalModel(model, name), BOUND] }),
})

const svelteRelay = (model, { added, attributes, script }) => ({
  attributes: (node) => (node === model.element ? { end: attributes } : {}),
  props: { added, bound: model.bindables },
  script: () => ({ before: script }),
})

const checked = ({ model }) => ({
  react: NOTHING,
  solid: solidControl(model),
  svelte: svelteRelay(model, {
    added: ["defaultChecked", "value"],
    attributes: [
      uses(
        "{@attach relayChecked(\n  relay,\n  () => checked,\n  () =>\n    group === undefined || value === undefined\n      ? undefined\n      : group.includes(value),\n)}",
        RELAY_CHECKED,
      ),
      "defaultChecked={defaultChecked ?? initialChecked}",
      "{value}",
    ],
    script: [
      declaration(
        "initialChecked",
        uses(
          "const initialChecked = untrack(() =>\n  group !== undefined && value !== undefined\n    ? group.includes(value)\n    : checked,\n)",
          SVELTE_UNTRACK,
        ),
      ),
      declaration(
        "relay",
        uses(
          "const relay = (input: HTMLInputElement) => {\n  checked = input.checked\n  if (value !== undefined) {\n    group = toggleInGroup(group ?? [], value, input.checked)\n  }\n}",
          named("../group", "toggleInGroup"),
        ),
      ),
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
      uses(
        "{@attach relayChecked(\n  relay,\n  () => checked ?? undefined,\n  () => (group === undefined ? undefined : group === (value ?? true)),\n)}",
        RELAY_CHECKED,
      ),
      "defaultChecked={defaultChecked ?? initialChecked}",
      "{value}",
    ],
    script: [
      declaration(
        "initialChecked",
        uses(
          "const initialChecked = untrack(() =>\n  group !== undefined ? group === (value ?? true) : checked,\n)",
          SVELTE_UNTRACK,
        ),
      ),
      declaration(
        "relay",
        "const relay = (input: HTMLInputElement) => {\n  if (input.checked) group = value ?? true\n  else if (group === (value ?? true)) group = undefined\n}",
      ),
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
      props: controlled(model),
      script: () => ({
        before: [
          declaration(
            "change",
            uses(
              code`const change = useCallback(\n  (input: HTMLInputElement) => {\n  ${report(component, "onValueChange", "multiple", model.local)}\n},\n  [${generic ? `multiple, onValueChange, ${model.local}` : "onValueChange"}],\n)`,
              named("react", "useCallback"),
            ),
          ),
        ],
      }),
    },
    solid: {
      context: [
        { code: "change", key: "change" },
        { code: "props.defaultValue", key: "defaultValue" },
        ...provided,
      ],
      props: controlled(model),
      script: () => ({
        before: [
          declaration(
            "change",
            code`const change = (input: HTMLInputElement) => {\n  ${report(component, "props.onValueChange", "props.multiple", `props.${model.prop}`)}\n}`,
          ),
        ],
      }),
    },
    svelte: {
      context: [
        {
          key: "change",
          text: uses(
            `change(input) {\nif (input.checked${generic ? ' || input.type === "checkbox"' : ""}) ${model.prop} = ${model.read}\nelse if (${model.prop} === input.value) ${model.prop} = undefined\n},`,
            ...(generic
              ? [named(selectionImport(component), "selectionOf")]
              : []),
          ),
        },
        ...provided,
      ],
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
      generic: generic
        ? {
            parameter: "Multiple extends boolean = false",
            props: "{ multiple?: Multiple }",
            type: `type Model = Multiple extends true ? ${members.filter(isArrayType).join(" | ")} : ${members.filter((member) => !isArrayType(member)).join(" | ")}`,
          }
        : undefined,
      props: {
        added: generic ? ["multiple"] : [],
        dropped: [model.prop],
        initial: [[model.prop, "modelValue"]],
      },
      script: () => ({
        before: [
          declaration(
            "model",
            `const model = defineModel<${generic ? "Model" : model.type}>()`,
          ),
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
                code`checked={${model.local} !== undefined ? ${radio.checked} : undefined}`,
                code`defaultChecked={${model.local} !== undefined ? undefined : ${radio.checked}}`,
                code`onChange={() => onValueChange?.(${radio.value})}`,
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
          code`() => props.${model.prop} === undefined ? undefined : ${radio.checked}`,
          code`props.${model.prop} === undefined ? ${radio.checked} : undefined`,
        )
        return {
          checked: [
            code`{...${control}.server}`,
            code`onChange={() => props.onValueChange?.(${radio.value})}`,
            code`ref={${control}.ref}`,
          ],
        }
      },
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
                uses(
                  code`defaultChecked={untrack(() => ${radio.checked})}`,
                  SVELTE_UNTRACK,
                ),
                uses(
                  code`{@attach relayChecked(\n  (input) => {\n    if (input.checked) ${model.local} = ${radio.value}\n    else if (${radio.checked}) ${model.local} = undefined\n  },\n  () => (${model.local} === undefined ? undefined : ${radio.checked}),\n)}`,
                  RELAY_CHECKED,
                ),
              ],
            }
          : {}
      },
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
      rename: [[model.local, "model.value", "model"]],
      script: () => ({
        before: [
          declaration(
            "modelValue",
            `const modelValue = defineModel<${model.type}>()`,
          ),
          BOUND,
          declaration(
            "model",
            uses(
              reads(
                `const model = computed(() => modelValue.value ?? ${model.local})`,
                "modelValue",
                model.local,
              ),
              COMPUTED,
            ),
          ),
        ],
      }),
    },
  }
}

const groupItem = (component, model) => {
  const { item } = component
  const change = (call) =>
    code`onChange={(event) => {\n  ${item.parent}?.change?.(event.currentTarget)\n  ${call}\n}}`
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
            item.checked
              ? code`defaultChecked={${item.grouped} !== undefined ? undefined : ${item.checked} === undefined ? (${defaultGrouped} ?? defaultChecked) : defaultChecked}`
              : code`defaultChecked={${item.grouped} !== undefined ? undefined : (${defaultGrouped} ?? defaultChecked)}`,
          ],
          end: ["ref={ref}", change("onChange?.(event)")],
        }
      },
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
          code`() => ${port.rewrite(checkedOf(node).code)}`,
          code`${port.rewrite(item.defaultGrouped)} ?? props.defaultChecked`,
        )
        return {
          checked: [code`{...${control}.server}`],
          end: [
            code`ref={[props.ref, ${control}.ref]}`,
            change(uses("callHandler(props.onChange, event)", CALL_HANDLER)),
          ],
        }
      },
      props: { added: ["defaultChecked", "onChange", "ref"] },
      script: (rewrite) => ({
        after: [
          uses(
            code`if (DEV) untrack(() =>\n${groupWarning(
              component,
              item,
              code`${rewrite(item.checked ?? "undefined")} ?? props.defaultChecked`,
              rewrite(item.grouped),
            )}\n)`,
            DEV,
            SOLID_UNTRACK,
          ),
        ],
      }),
    },
    svelte: {
      attributes: (node) =>
        node === item.input
          ? {
              checked: [
                uses(
                  "{@attach relayChecked(change, isChecked)}",
                  RELAY_CHECKED,
                ),
                `defaultChecked={${item.grouped} === undefined ? (defaultChecked ?? initialChecked) : initialChecked}`,
              ],
            }
          : {},
      props: {
        added: ["defaultChecked"],
        bound: model ? model.bindables : [],
      },
      script: (rewrite) => ({
        after: [
          uses(
            code`if (DEV) untrack(() => ${groupWarning(component, item, `${item.checked ?? "undefined"} ?? defaultChecked`)})`,
            DEV,
            SVELTE_UNTRACK,
          ),
          declaration(
            "isChecked",
            code`const isChecked = () => ${rewrite(item.checkedCode)}`,
          ),
          declaration(
            "initialChecked",
            uses(
              "const initialChecked = untrack(() => isChecked() ?? !!defaultChecked)",
              SVELTE_UNTRACK,
            ),
          ),
          declaration(
            "change",
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
          ),
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
      props: { unset: item.checked ? ["checked"] : [] },
      script: () => ({
        after: [
          uses(
            code`if (DEV) watchEffect(() =>\n  ${groupWarning(
              component,
              item,
              model && item.checked
                ? `${item.checked} ?? model.value`
                : (item.checked ?? "undefined"),
              reads(`${item.grouped}.value`, item.grouped),
            )},\n)`,
            DEV,
            WATCH_EFFECT,
          ),
          declaration("target", uses(target, COMPUTED)),
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

const shapeOf = (parts, context, refusal) => {
  const script = (rewrite) => ({
    after: [],
    before: [],
    ...parts.script?.(rewrite),
  })
  const { after, before } = script((text) => text)
  return {
    attributes: (node, port) => ({
      bound: undefined,
      checked: undefined,
      end: [],
      rename: [],
      rest: [],
      ...parts.attributes?.(node, port),
    }),
    context: parts.context ?? context,
    declares: declaredIn([...before, ...after]).toSorted(byName),
    generic: parts.generic,
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
    script,
  }
}

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
