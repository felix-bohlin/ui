import { selectionImport } from "./component-emit.mjs"

const arrayRead = (model) => model.read.startsWith("selectionOf")

const bindableProps = (model) => model.bindables.map(({ prop }) => prop)

const optionalModel = (model, name = "modelValue") =>
  `const ${name} = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`

const report = (model, callback, multiple) =>
  arrayRead(model)
    ? `if (${multiple}) ${callback}?.(checkedValues(input))\n  else ${callback}?.(input.value)`
    : `${callback}?.(${model.read})`

const solidChecked = {
  attributes: () => [
    "{...checkedControl.server}",
    "ref={[props.ref, checkedControl.ref]}",
  ],
  body: () => [
    'const checkedControl = control("checked", () => props.checked)',
  ],
  omits: () => ["checked", "ref"],
  locals: () => ["checkedControl"],
}

const BOUND = "const bound = useBound()"

export const modelHelpers = (framework, component) =>
  ({
    react: { checkedValues: selectionImport(component), useCallback: "react" },
    solid: {
      checkedValues: selectionImport(component),
      control: "../solid",
      optionSelected: "../solid",
      untrack: "solid-js",
    },
    svelte: {
      seedChecked: "../svelte",
      selectionOf: selectionImport(component),
      toggleInGroup: "../group",
      untrack: "svelte",
    },
    vue: { useBound: "../vue" },
  })[framework]

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
    },
  },
  group: {
    react: {
      body: (model) => [
        `const change = useCallback(\n  (input: HTMLInputElement) => {\n  ${report(model, "onValueChange", "multiple")}\n},\n  [${arrayRead(model) ? "multiple, " : ""}onValueChange],\n)`,
      ],
      entries: () => ["defaultValue", "onValueChange"],
      provided: (_, provide) => [
        { code: "change", key: "change" },
        { code: "defaultValue", key: "defaultValue" },
        ...provide.value,
      ],
      tiedCallbacks: true,
    },
    solid: {
      body: (model) => [
        `const change = (input: HTMLInputElement) => {\n  ${report(model, "props.onValueChange", "props.multiple")}\n}`,
      ],
      entries: () => ["defaultValue", "onValueChange"],
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
    },
    svelte: {
      bindables: (model) => [model.prop],
      modelsGroupRadio: true,
      radioAttributes: (model, value, checked) => [
        `defaultChecked={untrack(() => ${checked})}`,
        `{@attach seedChecked(\n  () => ${checked},\n  () => {\n    ${model.local} = ${value}\n  },\n)}`,
        `onchange={() => {\n  ${model.local} = ${value}\n}}`,
      ],
      typedBindables: true,
    },
    vue: {
      boundAttributes: () => ['v-model="modelValue"'],
      rename: (model) => ({
        script: [[model.local, "model.value"]],
        template: [[model.local, "model"]],
      }),
      setup: (model) => [
        `const modelValue = defineModel<${model.type}>()`,
        BOUND,
        `const model = computed(() => modelValue.value ?? ${model.local})`,
      ],
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
      typedBindables: true,
    },
    vue: {
      boundAttributes: () => [':value="attrs.value"', 'v-model="modelValue"'],
      explicitAttrs: true,
      setup: (model) => [optionalModel(model), BOUND],
    },
  },
}
