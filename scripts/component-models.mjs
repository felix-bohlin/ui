import { selectionImport } from "./component-emit.mjs"
import { capitalize } from "./component-shared.mjs"

const arrayRead = (model) => model.read.startsWith("selectionOf")

const bindableProps = (model) => model.bindables.map(({ prop }) => prop)

const optionalModel = (model, name = "modelValue") =>
  `const ${name} = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`

const selectionImports = (component, model) =>
  arrayRead(model)
    ? [`import { selectionOf } from "${selectionImport(component)}"`]
    : []

const reportImports = (component, model) =>
  arrayRead(model)
    ? [`import { checkedValues } from "${selectionImport(component)}"`]
    : []

const report = (model, callback, multiple) =>
  arrayRead(model)
    ? `if (${multiple}) ${callback}?.(checkedValues(input))\n  else ${callback}?.(input.value)`
    : `${callback}?.(${model.read})`

const resettable = (model) =>
  model.prop === "value" && ["input", "textarea"].includes(model.element.tag)

const solidChecked = {
  attributes: () => [
    "{...checkedControl.server}",
    "ref={[props.ref, checkedControl.ref]}",
  ],
  body: () => [
    'const checkedControl = control(\n  "checked",\n  () => props.checked,\n  untrack(() => props.checked),\n)',
  ],
  omits: () => ["checked", "ref"],
  locals: () => ["checkedControl"],
  solidHelpers: () => ["control"],
  solidValues: () => ["untrack"],
}

const BOUND = "const bound = useBound()"

const ownsDefault = (model) => model.element?.tag === "select"

export const MODEL_KINDS = {
  checked: {
    solid: solidChecked,
    svelte: {
      attributes: () => [
        "bind:checked={getChecked, setChecked}",
        "{defaultChecked}",
        "{value}",
      ],
      bindables: bindableProps,
      imports: () => [`import { toggleInGroup } from "../group"`],
      plainProps: () => ["defaultChecked", "value"],
      script: () => [
        "const getChecked = () =>\n  group ? group.includes(value) : !!(checked ?? defaultChecked)",
        "const setChecked = (isChecked: boolean) => {\n  if (group) group = toggleInGroup(group, value, isChecked)\n  else checked = isChecked\n}",
      ],
      typedBindables: true,
    },
    vue: {
      boundAttributes: () => ['v-model="modelValue"'],
      explicitAttrs: true,
      setup: (model) => [optionalModel(model), BOUND],
      vueHelpers: () => ["useBound"],
    },
  },
  checkedItem: {
    solid: {},
    svelte: {
      bindables: bindableProps,
      change: (model, item) => [
        `if (${item.grouped} === undefined) ${model.prop} = input.checked`,
      ],
      typedBindables: true,
    },
    vue: {
      checkedRename: (item) =>
        item.checked ? [item.checked, `model ?? ${item.checked}`] : undefined,
      ownModel: true,
      setup: (model) => [optionalModel(model, "model"), BOUND],
      vueHelpers: () => ["useBound"],
      warningChecked: (item) =>
        item.checked ? `${item.checked} ?? model.value` : undefined,
    },
  },
  forward: {
    solid: {},
    svelte: {
      attributes: (model) => model.bindables.map(({ prop }) => `bind:${prop}`),
      bindables: bindableProps,
      typedBindables: true,
    },
    vue: {
      boundAttributes: () => ['v-model="model"'],
      setup: (model) => [optionalModel(model, "model"), BOUND],
      vueHelpers: () => ["useBound"],
    },
  },
  group: {
    react: {
      body: (model) => [
        `const change = useCallback(\n  (input: HTMLInputElement) => {\n  ${report(model, "onValueChange", "multiple")}\n},\n  [${arrayRead(model) ? "multiple, " : ""}onValueChange],\n)`,
      ],
      entries: () => ["defaultValue", "onValueChange"],
      imports: reportImports,
      provided: (_, provide) => [
        { code: "change", key: "change" },
        { code: "defaultValue", key: "defaultValue" },
        ...provide.value,
      ],
      reactValues: () => ["useCallback"],
      tiedCallbacks: true,
    },
    solid: {
      body: (model) => [
        `const change = (input: HTMLInputElement) => {\n  ${report(model, "props.onValueChange", "props.multiple")}\n}`,
      ],
      entries: () => ["defaultValue", "onValueChange"],
      imports: reportImports,
      locals: () => ["change"],
      provided: (_, provide) => [
        { code: "change", key: "change" },
        { code: "props.defaultValue", key: "defaultValue" },
        ...provide.value,
      ],
      tiedCallbacks: true,
    },
    svelte: {
      bindables: bindableProps,
      context: (model) => [
        `change(input) {\nif (${model.prop} !== undefined) ${model.prop} = ${model.read}\n},`,
      ],
      imports: selectionImports,
      typedBindables: true,
    },
    vue: {
      generic: arrayRead,
      providedEntry: (model, key) =>
        key === model.prop ? `${key}: model` : undefined,
      providedFirst: () => ["bound"],
      setup: (model, generic) => [
        `const model = defineModel<${generic ? "Model" : model.type}>()`,
        BOUND,
      ],
      undeclared: (model, prop) => prop === model.prop,
      vueHelpers: () => ["useBound"],
    },
  },
  radioGroup: {
    react: {
      client: true,
      entries: () => ["defaultValue", "onValueChange"],
      radioAttributes: (model, value, checked) => [
        `checked={${model.local} !== undefined ? ${checked} : undefined}`,
        `defaultChecked={${model.local} !== undefined ? undefined : ${checked}}`,
        `onChange={() => onValueChange?.(${value})}`,
      ],
      rename: (model) => [[model.local, `${model.local} ?? defaultValue`]],
    },
    solid: {
      entries: () => ["defaultValue", "onValueChange"],
      radioAttributes: (_, value, control) => [
        `{...${control}.server}`,
        `onChange={() => props.onValueChange?.(${value})}`,
        `ref={${control}.ref}`,
      ],
      radioChecked: (model, checked) =>
        `props.${model.prop} === undefined ? undefined : ${checked}`,
      rename: (model) => [
        [model.local, `props.${model.prop} ?? props.defaultValue`],
      ],
      solidHelpers: () => ["control"],
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
      typedBindables: true,
      untrack: () => true,
    },
    vue: {
      boundAttributes: () => ['v-model="modelValue"'],
      computed: true,
      modelsGroupRadio: true,
      rename: (model) => ({
        script: [[model.local, "model.value"]],
        template: [[model.local, "model"]],
      }),
      setup: (model) => [
        `const modelValue = defineModel<${model.type}>()`,
        BOUND,
        `const model = computed(() => modelValue.value ?? ${model.local})`,
      ],
      vueHelpers: () => ["useBound"],
    },
  },
  radio: {
    solid: solidChecked,
    svelte: {
      attributes: () => [
        "{@attach seedChecked(isChecked, check)}",
        "defaultChecked={defaultChecked ?? initialChecked}",
        "onchange={(event) => {\n  check()\n  onchange?.(event)\n}}",
        "{value}",
      ],
      bindables: bindableProps,
      plainProps: () => ["checked", "defaultChecked", "onchange", "value"],
      script: () => [
        "const hasGroup = untrack(() => group !== undefined)",
        "const isChecked = () =>\n  hasGroup\n    ? group === (value ?? true)\n    : (checked ??\n      (group !== undefined ? group === (value ?? true) : !!defaultChecked))",
        "const initialChecked = untrack(isChecked)",
        "const check = () => {\n  group = value ?? true\n}",
      ],
      imports: () => [`import { seedChecked } from "../svelte"`],
      typedBindables: true,
      untrack: () => true,
    },
    vue: {
      boundAttributes: () => [':value="attrs.value"', 'v-model="modelValue"'],
      explicitAttrs: true,
      setup: (model) => [optionalModel(model), BOUND],
      vueHelpers: () => ["useBound"],
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
    solid: {
      attributes: (model) => [
        `{...${model.prop}Control.server}`,
        `ref={[props.ref, ${model.prop}Control.ref]}`,
      ],
      body: (model, _, read) => [
        `const ${model.prop}Control = control(\n  ${JSON.stringify(model.prop)},\n  () => props.${model.prop},\n  untrack(() => props.${model.prop}${ownsDefault(model) ? ` ?? props.default${capitalize(model.prop)}` : ""}),\n)`,
        ...(read
          ? [
              `const ${model.local} = () => props.${model.prop} ?? props.default${capitalize(model.prop)}`,
            ]
          : []),
      ],
      omits: (model) => [model.prop, "ref"],
      locals: (model) => [`${model.prop}Control`],
      ownDefault: ownsDefault,
      rename: (model) =>
        model.local ? [[model.local, `${model.local}()`]] : [],
      solidHelpers: () => ["control"],
      solidValues: () => ["untrack"],
    },
    svelte: {
      attributes: (model) =>
        resettable(model)
          ? ["bind:value={getValue, setValue}", "{defaultValue}"]
          : [`bind:${model.prop}`],
      bindables: (model) => [model.prop],
      plainProps: (model) => (resettable(model) ? ["defaultValue"] : []),
      rename: (model) =>
        resettable(model) && model.local ? [[model.local, "getValue()"]] : [],
      script: (model) =>
        resettable(model)
          ? [
              "const getValue = () => value ?? defaultValue",
              "const setValue = (next: typeof value) => {\n  value = next\n}",
            ]
          : [],
    },
    vue: {
      boundAttributes: () => ['v-model="modelValue"'],
      computed: (_, read) => read,
      rename: (model) => ({
        script: model.local ? [[model.local, "model.value"]] : [],
        template: model.local ? [[model.local, "model"]] : [],
      }),
      setup: (model, _, read) => [
        `const modelValue = defineModel<${model.type}>()`,
        BOUND,
        ...(read
          ? [`const model = computed(() => modelValue.value ?? ${model.local})`]
          : []),
      ],
      declared: (model) => (model.local ? [] : [model.prop]),
      unboundOwn: (model) =>
        model.element.tag === "textarea"
          ? { child: true, code: model.local ?? model.prop, name: model.prop }
          : { attr: true, code: model.local ?? model.prop, name: model.prop },
      vueHelpers: () => ["useBound"],
    },
  },
}
