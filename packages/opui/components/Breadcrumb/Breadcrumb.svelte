<script lang="ts">
  import { classAttrs } from "../cx"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    items,
    overflow,
    size,

    // Snippets
    children,
    separator,
    ...rest
  }: Props = $props()

  const lastIndex = $derived(items ? items.length - 1 : -1)
</script>

<nav
  class={[
    "ui-breadcrumb",
    overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {...rest}
>
  <ol>
    {#each items as { current, href, label }, index (index)}
      {@const ItemTag = href ? "a" : "span"}
      <li>
        {#if index > 0 && separator}
          <span aria-hidden="true" class="ui-separator">
            {@render separator()}
          </span>
        {/if}<svelte:element
          this={ItemTag}
          aria-current={(current ?? index === lastIndex) ? "page" : undefined}
          {...classAttrs([href && "ui-link"])}
          {href}>{label}</svelte:element
        >
      </li>
    {/each}
    {@render children?.()}
  </ol>
</nav>
