<script lang="ts">
  import { classAttrs } from "../cx"
  import type { BreadcrumbItemProps as Props } from "./types.svelte"

  let {
    class: className,
    current,
    href,
    label,

    // Snippets
    children,
    separator,
    ...rest
  }: Props = $props()

  const Tag = $derived(href ? "a" : "span")
</script>

<li {...classAttrs(className)} {...rest}>
  {#if separator}
    <span aria-hidden="true" class="ui-separator">
      {@render separator()}
    </span>
  {/if}
  <svelte:element this={Tag} aria-current={current ? "page" : undefined} {href}>
    {label}{@render children?.()}
  </svelte:element>
</li>
