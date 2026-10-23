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
    popover = "auto",
    side,

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
    side && side !== "block-end" && `ui-${side}`,
    className,
  ]}
  id={menuId}
  popover={popover === "auto" ? "" : popover}
  {...rest}
>
  {#each items ?? [] as { borderTop, color, disabled, href, keepOpen, label, shortcut, ...itemRest }, index (index)}
    {@const closes = !href && !keepOpen && !disabled}
    <li class={[{ "ui-border-top": borderTop }, color && `ui-${color}`]}>
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
          <p>{label}</p>
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
