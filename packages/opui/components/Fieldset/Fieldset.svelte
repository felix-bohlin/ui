<script lang="ts">
  import { setFieldsetContext } from "./context.svelte"
  import { autoLabelledBy } from "../id"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    as: Tag = "fieldset",
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const isFieldset = $derived(Tag === "fieldset")
  const legendId = $derived(
    isFieldset
      ? undefined
      : autoLabelledBy(rest, `${rest.id || `fieldset-${uid}`}-legend`),
  )
  setFieldsetContext({
    get legendId() {
      return legendId
    },
  })
</script>

<svelte:element
  this={Tag}
  aria-labelledby={legendId}
  class={["ui-fieldset", className]}
  role={isFieldset ? undefined : "group"}
  {...defined(rest)}
>
  {@render children?.()}
</svelte:element>
