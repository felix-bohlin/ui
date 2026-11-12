<script lang="ts">
  import "../../elements/close-on-navigate.js"
  import "../../elements/menu.js"
  import { untrack } from "svelte"
  import { getMenuContext, setMenuContext } from "./context.svelte"
  import { warnMissingId } from "../dev"
  import { tagAttrs } from "../tag"
  import { defined } from "../attrs"
  import { classAttrs } from "../cx"
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
    iconChecked,
    ...rest
  }: Props = $props()

  const parent = getMenuContext()
  const rootId = $derived(parent?.rootId ?? id)
  untrack(() => warnMissingId("Menu", id))
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
    side && side !== "block-end" && `ui-${side}`,
    className,
  ]}
  {id}
  popover={popover === "auto" ? "" : popover}
  {...rest}
>
  {#each items ?? [] as { borderTop, color, disabled, href, keepOpen, label, shortcut, ...itemRest }, index (index)}
    {@const Tag = href ? "a" : "button"}
    {@const closes =
      !href &&
      !keepOpen &&
      !disabled &&
      itemRest.type !== "submit" &&
      itemRest.type !== "reset"}
    <li
      {...classAttrs([{ "ui-border-top": borderTop }, color && `ui-${color}`])}
    >
      <svelte:element
        this={Tag}
        {...tagAttrs(Tag, disabled, href)}
        command={closes ? "hide-popover" : undefined}
        commandfor={closes ? rootId : undefined}
        data-keep-open={keepOpen ? "" : undefined}
        {...defined(itemRest)}
      >
        <div class="ui-text">
          <p>{label}</p>
        </div>
        {#if shortcut}
          <div class="ui-end">
            <kbd>{shortcut}</kbd>
          </div>
        {/if}{#if iconChecked}
          <span aria-hidden="true" class="ui-icon-checked">
            {@render iconChecked()}
          </span>
        {/if}
      </svelte:element>
    </li>
  {/each}
  {@render children?.()}
</menu>
