<script lang="ts">
  import type { Props } from "./types.svelte"
  import type { SvelteHTMLElements } from "svelte/elements"

  let {
    align,
    class: className,
    color,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

{#if children}<div
    class={[
      "ui-divider",
      align && align !== "center" && `ui-align-${align}`,
      color && `ui-${color}`,
      variant && variant !== "outlined" && `ui-${variant}`,
      className,
    ]}
    {...rest as SvelteHTMLElements["div"]}
  >
    {@render children?.()}
  </div>{:else}<hr
    class={[
      "ui-divider",
      color && `ui-${color}`,
      variant && variant !== "outlined" && `ui-${variant}`,
      className,
    ]}
    {...rest}
  />{/if}
