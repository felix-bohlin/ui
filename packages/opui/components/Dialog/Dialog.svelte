<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    actionsAlign,
    class: className,
    closedby,

    // Snippets
    actions,
    children,
    content,
    header,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const headerId = $derived(
    header && !rest["aria-labelledby"] ? `dialog-header-${uid}` : undefined,
  )
</script>

<dialog
  aria-labelledby={headerId}
  class={["ui-dialog ui-card ui-elevated", className]}
  {closedby}
  {...rest}
>
  {#if header}
    <hgroup id={headerId}>
      {#if typeof header === "string"}{header}{:else}{@render header()}{/if}
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
</dialog>
