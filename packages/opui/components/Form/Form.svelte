<script lang="ts">
  import type { Props } from "./types.svelte"
  import { serializeForm, createForm, setFormContext } from "./context.svelte"
  import Accordion from "../Accordion/Accordion.svelte"

  export const title = "Form" as const

  const {
    as: Tag = "form",
    children,
    class: className,
    ...rest
  }: Props = $props()

  let element = $state<HTMLFormElement | HTMLElement | null>(null)
  export { element as this }

  const id = $props.id()
  const form = $derived(createForm({ name: rest.name }, { id }))
  setFormContext(form)
</script>

<svelte:element
  this={Tag}
  bind:this={element}
  class={["ui-form", className]}
  {...rest}
>
  {@render children?.()}
</svelte:element>
