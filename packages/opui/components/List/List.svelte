<script lang="ts">
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    as: Tag = "ul",
    bordered,
    class: className,
    dense,
    flush,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<svelte:element
  this={Tag}
  class={[
    "ui-list",
    { "ui-bordered": bordered, "ui-dense": dense, "ui-flush": flush },
    variant && variant !== "filled" && `ui-${variant}`,
    className,
  ]}
  role="list"
  {...defined(rest)}
>
  {@render children?.()}
</svelte:element>
