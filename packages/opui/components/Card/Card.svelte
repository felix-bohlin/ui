<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Card" as const

  let {
    class: className = "",
    variant = "text",
    actionsAlign,

    // Snippets
    action,
    children,
    content,
    header,
    ...rest
  }: Props = $props()

  let element = $state<HTMLElementTagNameMap["div"] | null>(null)
  export { element as this }

  const classes = $derived(["ui-card", variant && `ui-${variant}`, className])
</script>

<div bind:this={element} class={classes} {...rest}>
  {#if header}
    <hgroup>
      {@render header()}
    </hgroup>
  {/if}

  {#if content}
    <div class="ui-content">
      {@render content()}
    </div>
  {/if}
  {#if children}
    {@render children()}
  {/if}

  {#if action}
    <div
      class="ui-actions"
      class:ui-align-end={actionsAlign === "end" || undefined}
    >
      {@render action()}
    </div>
  {/if}
</div>
