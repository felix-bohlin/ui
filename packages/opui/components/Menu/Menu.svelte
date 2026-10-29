<script lang="ts">
  import { untrack } from "svelte"
  import { warnMissingId } from "../dev"
  import { getMenuContext, setMenuContext } from "./context.svelte"
  import { tagAttrs } from "../tag"
  import type { Props } from "./types.svelte"

  let {
    align,
    bordered,
    class: className,
    dense,
    id,
    items,
    orientation,
    popover = "auto",
    side,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  untrack(() => warnMissingId("Menu", id))
  const parent = getMenuContext()
  const rootId = $derived(parent?.rootId ?? id)

  setMenuContext({
    get rootId() {
      return rootId
    },
  })
</script>

<menu
  class={[
    "ui-menu",
    {
      "ui-align-end": align === "end",
      "ui-bordered": bordered,
      "ui-dense": dense,
    },
    orientation && orientation !== "vertical" && `ui-${orientation}`,
    side && side !== "block-end" && `ui-${side}`,
    className,
  ]}
  {id}
  popover={popover === "auto" ? "" : popover}
  {...rest}
>
  {#each items ?? [] as { borderTop, color, disabled, href, keepOpen, label, shortcut, ...itemRest }, index (index)}
    {@const closes = !href && !keepOpen && !disabled}
    <li class={[{ "ui-border-top": borderTop }, color && `ui-${color}`]}>
      <svelte:element
        this={href ? "a" : "button"}
        {...tagAttrs(href ? "a" : "button", disabled, href)}
        command={closes ? "hide-popover" : undefined}
        commandfor={closes ? rootId : undefined}
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
