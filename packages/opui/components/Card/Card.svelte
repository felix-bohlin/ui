<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"
  import type { Snippet } from "svelte"

  type Element = HTMLDivElement

  type Props = {
    class?: HTMLAttributes<Element>["class"]
    variant?: "text" | "outlined" | "tonal" | "elevated"
    actions?: { align: "start" | "end" }

    // Snippets
    action?: Snippet
    header?: Snippet
    children?: Snippet
    content?: Snippet
  } & HTMLAttributes<Element>

  let {
    class: className = "",
    variant = "text",
    actions,

    // Snippets
    action,
    children,
    content,
    header,
    ...rest
  }: Props = $props()

  export const title = "Card" as const
  let element = $state<Element | null>(null)
  export { element as this }

  const classes = $derived(["card", variant, className])
</script>

<div bind:this={element} class={classes} {...rest}>
  {#if header}
    <hgroup>
      {@render header()}
    </hgroup>
  {/if}

  {#if content}
    <div class="content">
      {@render content()}
    </div>
  {/if}
  {#if children}
    {@render children()}
  {/if}

  {#if action}
    <div
      class="actions"
      class:align-end={actions?.align === "end" || undefined}
    >
      {@render action()}
    </div>
  {/if}
</div>
