<script lang="ts">
  import Button from "../Button/Button.svelte"
  import Menu from "../Menu/Menu.svelte"
  import { collapsedLevels } from "./collapsed"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    items,
    menuLabel,
    overflow,
    size,

    // Snippets
    children,
    separator,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const lastIndex = $derived(items ? items.length - 1 : -1)
  const collapsed = $derived(
    overflow === "menu" && items ? collapsedLevels(items) : [],
  )
  const collapsing = $derived(collapsed.length > 0)
  const menuId = $derived(`breadcrumb-menu-${uid}`)
  const head = $derived(collapsing ? items?.slice(0, 1) : items)
  const tail = $derived(collapsing ? items?.slice(1) : undefined)
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
    {#each head as { current, href, label }, index (index)}
      {@const ItemTag = href ? "a" : "span"}
      <li>
        {#if index > 0 && separator}
          <span aria-hidden="true" class="ui-separator">
            {@render separator()}
          </span>
        {/if}<svelte:element
          this={ItemTag}
          aria-current={(current ?? index === lastIndex) ? "page" : undefined}
          {href}>{label}</svelte:element
        >
      </li>
    {/each}
    {#if collapsing}
      <li>
        {#if separator}
          <span aria-hidden="true" class="ui-separator">
            {@render separator()}
          </span>
        {/if}<Button
          aria-label={menuLabel}
          command="toggle-popover"
          commandfor={menuId}
          round
          size="x-small">…</Button
        ><Menu id={menuId} items={collapsed} />
      </li>
    {/if}
    {#each tail as { current, href, label }, index (index)}
      {@const TailTag = href ? "a" : "span"}
      <li>
        {#if separator}
          <span aria-hidden="true" class="ui-separator">
            {@render separator()}
          </span>
        {/if}<svelte:element
          this={TailTag}
          aria-current={(current ?? index === lastIndex - 1)
            ? "page"
            : undefined}
          {href}>{label}</svelte:element
        >
      </li>
    {/each}
    {@render children?.()}
  </ol>
</nav>
