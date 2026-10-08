<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    align,
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
</script>

<menu
  class={[
    "ui-menu",
    "ui-list",
    { "ui-align-end": align === "end", "ui-dense": dense },
    placement && placement !== "block-end" && `ui-${placement}`,
    className,
  ]}
  id={menuId}
  popover={popover === "auto" ? "" : popover}
  {...rest}
>
  {#each items ?? [] as { borderTop, closeOnClick = true, critical, disabled, href, label, shortcut, ...itemRest }, index (index)}
    {@const closes = !href && closeOnClick && !disabled}
    <li class={[{ "ui-border-top": borderTop, "ui-critical": critical }]}>
      <svelte:element
        this={href ? "a" : "button"}
        aria-disabled={href && disabled ? "true" : undefined}
        command={closes ? "hide-popover" : undefined}
        commandfor={closes ? menuId : undefined}
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
