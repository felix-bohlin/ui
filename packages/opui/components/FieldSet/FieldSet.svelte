<script lang="ts">
  import Accordion from "../Accordion/Accordion.svelte"
  import {
    createForm,
    getForm,
    serializeForm,
    setFormContext,
  } from "../Form/context.svelte"
  import type { Props } from "./types.svelte"

  export const title = "Field Set" as const

  const {
    as: Tag = "fieldset",
    children,
    class: className,
    ...rest
  }: Props = $props()

  const id = $props.id()

  const form = $derived(createForm({ name: rest.name ?? `fieldset-${id}` }))
  if (!getForm()) {
    setFormContext(form)
  }

  let element = $state<HTMLFieldSetElement | HTMLElement | null>(null)
  export { element as this }
</script>

<svelte:element
  this={Tag}
  bind:this={element}
  class={["ui-fieldset", className]}
  {...rest}
>
  {@render children?.()}
</svelte:element>
