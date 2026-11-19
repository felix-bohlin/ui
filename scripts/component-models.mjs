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
    ? [
        `import { checkedValues, selectionOf } from "${selectionImport(component)}"`,
      ]
    : []

const report = (model, callback, multiple) =>
  arrayRead(model)
    ? `if (${multiple}) ${callback}?.(checkedValues(input))\n  else ${callback}?.(input.value)`
    : `${callback}?.(next)`

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
        "defaultChecked={defaultChecked ?? initialChecked}",
        "{value}",
      ],
      bindables: bindableProps,
      imports: () => [`import { toggleInGroup } from "../group"`],
      plainProps: () => ["defaultChecked", "value"],
      script: () => [
        "const getChecked = () =>\n  group ? group.includes(value) : !!(checked ?? defaultChecked)",
        "const setChecked = (isChecked: boolean) => {\n  if (group) group = toggleInGroup(group, value, isChecked)\n  else checked = isChecked\n}",
        "const initialChecked = untrack(getChecked)",
      ],
      typedBindables: true,
      untrack: () => true,
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
        "const [inner, setInner] = useState(defaultValue)",
        `const change = useCallback(\n  (input: HTMLInputElement) => {\n  const next = ${model.read}\n  setInner((current) => (current === undefined ? current : next))\n  ${report(model, "onValueChange", "multiple")}\n},\n  [${arrayRead(model) ? "multiple, " : ""}onValueChange],\n)`,
      ],
      entries: () => ["defaultValue", "onValueChange"],
      imports: reportImports,
      provided: (model, provide) => [
        { code: "change", key: "change" },
        ...provide.value.map((entry) =>
          entry.key === model.prop
            ? { code: `${model.prop} ?? inner`, key: entry.key }
            : entry,
        ),
      ],
      reactValues: () => ["useCallback", "useState"],
      tiedCallbacks: true,
    },
    solid: {
      body: (model, rewrite) => [
        "const [inner, setInner] = createSignal(untrack(() => props.defaultValue))",
        `const change = (input: HTMLInputElement) => {\n  const next = ${rewrite(model.read)}\n  if (inner() !== undefined) setInner(next)\n  ${report(model, "props.onValueChange", "props.multiple")}\n  restoreChecked(input, () => props.${model.prop})\n}`,
      ],
      entries: () => ["defaultValue", "onValueChange"],
      imports: reportImports,
      locals: () => ["change", "inner", "setInner"],
      provided: (model, provide) => [
        { code: "change", key: "change" },
        ...provide.value.map((entry) =>
          entry.key === model.prop
            ? { code: `props.${model.prop} ?? inner()`, key: entry.key }
            : entry,
        ),
      ],
      solidHelpers: () => ["restoreChecked"],
      solidValues: () => ["createSignal", "untrack"],
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
        `ref={seedChecked(() => onValueChange?.(${value}))}`,
      ],
      reactHelpers: () => ["seedChecked"],
      rename: (model) => [[model.local, `${model.local} ?? defaultValue`]],
    },
    solid: {
      entries: () => ["defaultValue", "onValueChange"],
      radioAttributes: (model, value, control) => [
        `{...${control}.server}`,
        `onChange={(event) => {\n  props.onValueChange?.(${value})\n  restoreChecked(event.currentTarget, () => props.${model.prop})\n}}`,
        `ref={[\n  ${control}.ref,\n  seedChecked((input) => {\n    props.onValueChange?.(${value})\n    restoreChecked(input, () => props.${model.prop})\n  }),\n]}`,
      ],
      radioChecked: (model, checked) =>
        `props.${model.prop} === undefined ? undefined : ${checked}`,
      rename: (model) => [
        [model.local, `props.${model.prop} ?? props.defaultValue`],
      ],
      solidHelpers: () => ["control", "restoreChecked", "seedChecked"],
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
          ? [
              "bind:value={getValue, setValue}",
              "defaultValue={defaultValue ?? initialValue}",
            ]
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
              "const initialValue = untrack(getValue)",
            ]
          : [],
      untrack: resettable,
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
      unboundOwn: (model) =>
        model.local
          ? {
              child: model.element.tag === "textarea",
              code: model.local,
              name: model.prop,
            }
          : undefined,
      vueHelpers: () => ["useBound"],
    },
  },
}
