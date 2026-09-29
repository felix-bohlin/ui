<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    actions,
    actionsAlign,
    children,
    class: className,
    closedby,
    content,
    header,
    ref = $bindable(null),
    ...rest
  }: Props = $props()
</script>

<dialog
  bind:this={ref}
  class={["ui-dialog ui-card ui-elevated", className]}
  {closedby}
  {...rest}
>
  {#if header}
    <hgroup>
      {#if typeof header === "string"}
        {header}
      {:else}
        {@render header()}
      {/if}
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
