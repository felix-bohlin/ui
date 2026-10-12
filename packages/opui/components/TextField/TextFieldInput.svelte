<script lang="ts">
  import { getFieldRoot } from "../Field/context"
  import { getFieldContext } from "../FieldGroup/context"
  import type { TextFieldInputProps as Props } from "./types.svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    inputmode,
    name,
    pattern,
    type = "text",
    value = $bindable(),
    ...rest
  }: Props = $props()

  const field = getFieldRoot()
  const group = getFieldContext()
  const describedBy = $derived(
    [field?.describedBy, ariaDescribedBy].filter(Boolean).join(" ") ||
      undefined,
  )
</script>

<input
  {...rest}
  aria-describedby={describedBy}
  aria-invalid={field?.invalid ? "true" : ariaInvalid}
  bind:value
  inputmode={inputmode ?? (type === "numeric" ? "numeric" : undefined)}
  name={name ?? group?.name}
  pattern={pattern ?? (type === "numeric" ? "[0-9]*" : undefined)}
  type={type === "numeric" ? "text" : type}
/>
