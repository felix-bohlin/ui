<script lang="ts">
  import type { Props } from "./types.svelte"
  import {
    createFieldGroup,
    setFieldGroupContext,
    createField,
    addField,
    getForm,
    removeField,
  } from "../Form/context.svelte"
  import { onMount } from "svelte"
  export const title = "Field Group" as const

  const {
    children,
    class: className,
    direction,
    name,
    type: inputType,
    ...rest
  }: Props = $props()

  const isGroup = $derived(Boolean(name && inputType))
  const fieldGroup = $derived(
    createFieldGroup(
      {
        name,
      },
      { inputType: "checkbox" },
    ),
  )
  setFieldGroupContext(fieldGroup)

  const field = $derived(
    createField(
      {
        name: name ?? "",
        type: isGroup ? "group" : "default",
      },
      { inputType },
    ),
  )

  $effect.pre(() => {
    if (field.type === "group") {
      addField(field)
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

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }
  const classes = $derived([
    "ui-field-group",
    direction && `ui-${direction}`,
    className,
  ])
</script>

<div bind:this={element} class={classes} {...rest} role="group">
  {@render children?.(fieldGroup)}
</div>
