import { selectionImport } from "./component-emit.mjs"

const arrayRead = (model) => model.read.startsWith("selectionOf")

const bindableProps = (model) => model.bindables.map(({ prop }) => prop)

const optionalModel = (model, name = "modelValue") =>
  `const ${name} = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`

const report = (model, callback, multiple, selected) =>
  arrayRead(model)
    ? `if (${multiple}) ${callback}?.(checkedValues(input, ${selected}))\n  else ${callback}?.(input.value)`
    : `${callback}?.(${model.read})`

const solidChecked = {
  attributes: () => [
    "{...checkedControl.server}",
    "ref={[props.ref, checkedControl.ref]}",
  ],
  body: () => ["const checkedControl = control(() => props.checked)"],
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
      untrack: "solid-js",
    },
    svelte: {
      relayChecked: "../svelte",
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
        "{@attach relayChecked(\n  relay,\n  () => checked,\n  () =>\n    group === undefined || value === undefined\n      ? undefined\n      : group.includes(value),\n)}",
        "defaultChecked={defaultChecked ?? initialChecked}",
        "{value}",
      ],
      bindables: bindableProps,
      plainProps: () => ["defaultChecked", "value"],
      script: () => [
        "const initialChecked = untrack(() =>\n  group !== undefined && value !== undefined\n    ? group.includes(value)\n    : checked,\n)",
        "const relay = (input: HTMLInputElement) => {\n  checked = input.checked\n  if (value !== undefined) {\n    group = toggleInGroup(group ?? [], value, input.checked)\n  }\n}",
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
        `const change = useCallback(\n  (input: HTMLInputElement) => {\n  ${report(model, "onValueChange", "multiple", model.local)}\n},\n  [${arrayRead(model) ? `multiple, onValueChange, ${model.local}` : "onValueChange"}],\n)`,
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
        `const change = (input: HTMLInputElement) => {\n  ${report(model, "props.onValueChange", "props.multiple", `props.${model.prop}`)}\n}`,
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
        `change(input) {\nif (input.checked${arrayRead(model) ? ' || input.type === "checkbox"' : ""}) ${model.prop} = ${model.read}\nelse if (${model.prop} === input.value) ${model.prop} = undefined\n},`,
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
      radioDefault: (model, checked) =>
        `props.${model.prop} === undefined ? ${checked} : undefined`,
      rename: (model) => [
        [model.local, `props.${model.prop} ?? props.defaultValue`],
      ],
    },
    svelte: {
      bindables: (model) => [model.prop],
      modelsGroupRadio: true,
      radioAttributes: (model, value, checked) => [
        `defaultChecked={untrack(() => ${checked})}`,
        `{@attach relayChecked(\n  (input) => {\n    if (input.checked) ${model.local} = ${value}\n    else if (${checked}) ${model.local} = undefined\n  },\n  () => (${model.local} === undefined ? undefined : ${checked}),\n)}`,
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
        "{@attach relayChecked(\n  relay,\n  () => checked ?? undefined,\n  () => (group === undefined ? undefined : group === (value ?? true)),\n)}",
        "defaultChecked={defaultChecked ?? initialChecked}",
        "{value}",
      ],
      bindables: bindableProps,
      plainProps: () => ["checked", "defaultChecked", "value"],
      script: () => [
        "const initialChecked = untrack(() =>\n  group !== undefined ? group === (value ?? true) : checked,\n)",
        "const relay = (input: HTMLInputElement) => {\n  if (input.checked) group = value ?? true\n  else if (group === (value ?? true)) group = undefined\n}",
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
