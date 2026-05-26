<script lang="ts">
  import {
    registerFormField,
    useSelect,
    useSelectAll,
  } from "../Form/context.svelte.ts"
  import type { CheckboxInputProps as Props } from "./types.svelte"

  export const title = "Checkbox Input" as const

  let {
    checked = $bindable(),
    indeterminate,
    useSelectAll: uSelectAll,
    useSelect: uSelect,
    ...rest
  }: Props = $props()
  const id = $props.id()
  let element = $state<HTMLInputElement | null>(null)
  export { element as this }

  const field = registerFormField(
    {
      name: rest.name,
    },
    {
      inputType: "checkbox",
      options: [rest.value],
      value: checked ? [rest.value] : [],
      id,
    },
  )
</script>

<input
  bind:this={element}
  bind:checked
  name={field.name}
  type="checkbox"
  data-indeterminate={indeterminate || undefined}
  use:useSelectAll={uSelectAll}
  use:useSelect={uSelect}
  {...rest}
/>
