<script lang="ts">
  import { onMount } from "svelte"
  import {
    addField,
    addFieldOptions,
    createField,
    getFieldGroup,
    getForm,
    removeField,
    useSelect,
  } from "../Form/context.svelte"
  import type { RadioInputProps as Props } from "./types.svelte"
  const { useSelect: uSelect, ...props }: Props = $props()

  const fieldGroup = getFieldGroup()
  const name = $derived(props.name ?? fieldGroup?.name ?? "")
  const field = $derived(
    createField(
      {
        name,
        type: Boolean(fieldGroup?.name && fieldGroup?.selection)
          ? "group"
          : "default",
      },
      { inputType: "radio", options: [props.value] },
    ),
  )

  $effect(() => {
    if (name) {
      if (field.type === "group") {
        addFieldOptions(name, field.options)
      } else {
        addField(field)
      }
    }
  })

  onMount(() => {
    const form = getForm()
    if (!form) return

    return () => {
      if (form.fields.has(field.name)) {
        removeField(field.name, form)
      }
    }
  })
</script>

<input type="radio" {...props} {name} use:useSelect={uSelect} />
