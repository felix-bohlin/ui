<script lang="ts">
  import { getMenuContext, setMenuContext } from "./context.svelte"
  import type { Props } from "./types.svelte"

  let {
    align,
    bordered,
    class: className,
    dense,
    id,
    items,
    placement,
    popover = "auto",

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const menuId = $derived(id || `menu-${uid}`)
  const parent = getMenuContext()
  const rootId = $derived(parent?.rootId ?? menuId)

  setMenuContext({
    get rootId() {
      return rootId
    },
  })
</script>

<menu
  class={[
    "ui-menu",
    "ui-list",
    {
      "ui-align-end": align === "end",
      "ui-bordered": bordered,
      "ui-dense": dense,
    },
    placement && placement !== "block-end" && `ui-${placement}`,
    className,
  ]}
  id={menuId}
  popover={popover === "auto" ? "" : popover}
  {...rest}
>
  {#each items ?? [] as { borderTop, closeOnClick = true, critical, disabled, href, shortcut, text, ...itemRest }, index (index)}
    {@const closes = !href && closeOnClick && !disabled}
    <li class={[{ "ui-border-top": borderTop, "ui-critical": critical }]}>
      <svelte:element
        this={href ? "a" : "button"}
        aria-disabled={href && disabled ? "true" : undefined}
        command={closes ? "hide-popover" : undefined}
        commandfor={closes ? rootId : undefined}
        disabled={!href && disabled ? true : undefined}
        href={href && !disabled ? href : undefined}
        type={href ? undefined : "button"}
        {...itemRest}
      >
        <div class="ui-text">
          <p>{text}</p>
        </div>
        {#if shortcut}
          <div class="ui-end">
            <kbd>{shortcut}</kbd>
          </div>
        {/if}
      </svelte:element>
    </li>
  {/each}
  {@render children?.()}
</menu>
