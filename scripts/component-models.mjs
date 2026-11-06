import { selectionImport } from "./component-emit.mjs"
import { capitalize } from "./component-shared.mjs"

const arrayRead = (model) => model.read.startsWith("selectionOf")

const bindableProps = (model) => model.bindables.map(({ prop }) => prop)

const optionalModel = (model) =>
  `const modelValue = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`

const selectionImports = (component, model) =>
  arrayRead(model)
    ? [`import { selectionOf } from "${selectionImport(component)}"`]
    : []

const resettable = (model) =>
  model.prop === "value" && ["input", "textarea"].includes(model.element.tag)

const numeric = (model) =>
  model.element.tag === "input" &&
  model.element.attributes.some(
    (item) =>
      item.kind === "static" &&
      item.name === "type" &&
      ["number", "range"].includes(item.value),
  )

export const MODEL_KINDS = {
  checked: {
    svelte: {
      attributes: () => [
        "bind:checked={getChecked, setChecked}",
        "defaultChecked={initialChecked}",
        "{value}",
      ],
      bindables: bindableProps,
      imports: () => [`import { toggleInGroup } from "../group"`],
      plainProps: () => ["value"],
      script: () => [
        "const getChecked = () => (group ? group.includes(value) : !!checked)",
        "const setChecked = (isChecked: boolean) => {\n  if (group) group = toggleInGroup(group, value, isChecked)\n  else checked = isChecked\n}",
        "const initialChecked = untrack(getChecked)",
      ],
      untrack: () => true,
    },
    vue: {
      attributes: () => ["v-seed", 'v-model="model"'],
      computed: true,
      explicitAttrs: true,
      setup: (model) => [
        optionalModel(model),
        "const model = computed({\n  get: () =>\n    modelValue.value ??\n    (attrs.checked !== undefined && attrs.checked !== false),\n  set: (value) => {\n    modelValue.value = value\n  },\n})",
      ],
      vueHelpers: () => ["vSeed"],
    },
  },
  checkedItem: {
    svelte: {
      bindables: bindableProps,
      onchange: (model, item) => [
        `if (${item.grouped} === undefined) ${model.prop} = event.currentTarget.checked`,
      ],
    },
    vue: {
      change: (item) =>
        `const change = (event: Event) => {\n  const input = event.currentTarget as HTMLInputElement\n  if (${item.grouped}.value === undefined) model.value = input.checked\n  ${item.parent}?.change?.(input)\n}`,
      checkedRename: (item) =>
        item.checked ? [item.checked, `model ?? ${item.checked}`] : undefined,
      setup: (model) => [
        `const model = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`,
      ],
      warningChecked: (item) =>
        item.checked ? `${item.checked} ?? model.value` : undefined,
    },
  },
  forward: {
    svelte: {
      attributes: (model) => model.bindables.map(({ prop }) => `bind:${prop}`),
      bindables: bindableProps,
    },
    vue: {
      attributes: () => ['v-model="modelValue"'],
      setup: (model) => [optionalModel(model)],
    },
  },
  group: {
    react: {
      body: (model) => [
        "const [inner, setInner] = useState(defaultValue)",
        `const change = (input: HTMLInputElement) => {\n  const next = ${model.read}\n  if (inner !== undefined) setInner(next)\n  onValueChange?.(next${arrayRead(model) ? " as never" : ""})\n}`,
      ],
      entries: () => ["defaultValue", "onValueChange"],
      imports: selectionImports,
      provided: (model, provide) => [
        { code: "change", key: "change" },
        ...provide.value.map((entry) =>
          entry.key === model.prop
            ? { code: `${model.prop} ?? inner`, key: entry.key }
            : entry,
        ),
      ],
      reactValues: () => ["useState"],
    },
    svelte: {
      bindables: bindableProps,
      context: (model) => [
        `change(input) {\nif (${model.prop} !== undefined) ${model.prop} = ${model.read}\n},`,
      ],
      imports: selectionImports,
    },
    vue: {
      computed: true,
      generic: arrayRead,
      imports: selectionImports,
      providedEntry: (model, key) =>
        key === model.prop ? `${key}: model` : undefined,
      providedFirst: () => ["change"],
      setup: (model, generic) => [
        `const model = defineModel<${generic ? "Model" : model.type}>()`,
        `const change = (input: HTMLInputElement) => {\n  if (model.value !== undefined) model.value = ${model.read}${generic ? " as Model" : ""}\n}`,
      ],
      undeclared: (model, prop) => prop === model.prop,
    },
  },
  radioGroup: {
    react: {
      client: true,
      entries: () => ["defaultValue", "onChange"],
      radioAttributes: (model, checked) => [
        `checked={${model.local} !== undefined ? ${checked} : undefined}`,
        `defaultChecked={${model.local} !== undefined ? undefined : ${checked}}`,
        "onChange={onChange}",
      ],
      rename: (model) => [[model.local, `${model.local} ?? defaultValue`]],
    },
    svelte: {
      bindables: (model) => [model.prop],
      imports: () => [`import { seedChecked } from "../svelte"`],
      modelsGroupRadio: true,
      radioAttributes: (model, value, checked) => [
        `defaultChecked={untrack(() => ${checked})}`,
        `{@attach seedChecked(\n  () => ${checked},\n  () => {\n    ${model.local} = ${value}\n  },\n)}`,
        `onchange={() => {\n  ${model.local} = ${value}\n}}`,
      ],
      untrack: () => true,
    },
    vue: {
      computed: true,
      modelsGroupRadio: true,
      radioAttributes: () => ["v-seed", 'v-model="model"'],
      rename: (model) => ({
        script: [[model.local, "model.value"]],
        template: [[model.local, "model"]],
      }),
      setup: (model) => [
        `const modelValue = defineModel<${model.type}>()`,
        `const model = computed({\n  get: () => modelValue.value ?? ${model.local},\n  set: (value) => {\n    modelValue.value = value\n  },\n})`,
      ],
      vueHelpers: () => ["vSeed"],
    },
  },
  radio: {
    svelte: {
      attributes: () => [
        "{@attach seedChecked(isChecked, check)}",
        "defaultChecked={initialChecked}",
        "onchange={(event) => {\n  check()\n  onchange?.(event)\n}}",
        "{value}",
      ],
      bindables: bindableProps,
      plainProps: () => ["checked", "onchange", "value"],
      script: () => [
        "const hasGroup = untrack(() => group !== undefined)",
        "const isChecked = () =>\n  hasGroup\n    ? group === (value ?? true)\n    : (checked ?? group === (value ?? true))",
        "const initialChecked = untrack(isChecked)",
        "const check = () => {\n  group = value ?? true\n}",
      ],
      imports: () => [`import { seedChecked } from "../svelte"`],
      untrack: () => true,
    },
    vue: {
      attributes: () => [':value="attrs.value"', "v-seed", 'v-model="model"'],
      computed: true,
      explicitAttrs: true,
      setup: (model) => [
        optionalModel(model),
        "const unchecked = Symbol()",
        `const model = computed({\n  get: () =>\n    modelValue.value ??\n    (attrs.checked !== undefined && attrs.checked !== false\n      ? attrs.value\n      : unchecked),\n  set: (value: ${model.type} | undefined) => {\n    modelValue.value = value\n  },\n})`,
      ],
      vueHelpers: () => ["vSeed"],
    },
  },
  value: {
    react: {
      inRest: true,
      rename: (model) =>
        model.local
          ? [
              [
                model.local,
                `${model.rest}.${model.prop} ?? ${model.rest}.default${capitalize(model.prop)}`,
              ],
            ]
          : [],
    },
    svelte: {
      attributes: (model) => [
        `bind:${model.prop}`,
        ...(resettable(model) ? ["defaultValue={initialValue}"] : []),
      ],
      bindables: (model) => [model.prop],
      script: (model) =>
        resettable(model)
          ? [`const initialValue = untrack(() => ${model.local ?? model.prop})`]
          : [],
      untrack: resettable,
    },
    vue: {
      attributes: (model) => [
        "v-seed",
        `v-model${numeric(model) ? ".number" : ""}="model"`,
      ],
      computed: true,
      declared: (model) => (model.local ? [] : [model.prop]),
      rename: (model) => ({
        script: model.local ? [[model.local, "model.value"]] : [],
        template: model.local ? [[model.local, "model"]] : [],
      }),
      setup: (model) => [
        `const modelValue = defineModel<${model.type}>()`,
        `const model = computed({\n  get: () => modelValue.value ?? ${model.local ?? model.prop},\n  set: (value) => {\n    modelValue.value = value\n  },\n})`,
      ],
      vueHelpers: () => ["vSeed"],
    },
  },
}
