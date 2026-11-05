<script lang="ts">
  import { untrack } from "svelte"
  import { getFieldsetContext } from "../Fieldset/context.svelte"
  import { warnReplacedId } from "../dev"
  import { classAttrs } from "../cx"
  import type { Props } from "./types.svelte"

  let {
    as: Tag = "legend",
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const fieldset = getFieldsetContext()
  const isLegend = $derived(Tag === "legend")
  untrack(() =>
    warnReplacedId("FieldLegend", "Fieldset", rest.id, fieldset?.legendId),
  )
</script>

<svelte:element
  this={Tag}
  {...classAttrs([{ "ui-legend": !isLegend }, className])}
  {...rest}
  id={fieldset?.legendId ?? rest.id}
>
  {@render children?.()}
</svelte:element>
