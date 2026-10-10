<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    align,
    class: className,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

{#if children}
  <div
    class={[
      "ui-divider",
      align && align !== "center" && `ui-align-${align}`,
      variant && `ui-${variant}`,
      className,
    ]}
    {...rest}
  >
    {@render children()}
  </div>
{:else}
  <hr class={["ui-divider", variant && `ui-${variant}`, className]} {...rest} />
{/if}
