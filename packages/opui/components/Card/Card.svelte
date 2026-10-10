<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    actionsAlign,
    class: className,
    variant,

    // Snippets
    actions,
    children,
    content,
    header,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-card", variant && `ui-${variant}`, className]} {...rest}>
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

  {@render children?.()}

  {#if actions}
    <div class={["ui-actions", actionsAlign && `ui-align-${actionsAlign}`]}>
      {@render actions()}
    </div>
  {/if}
</div>
