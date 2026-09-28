<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Dialog"

  const {
    actionsAlign,
    class: className,
    closedby,
    header,
    content,
    actions,
    ...rest
  }: Props = $props()

  let element = $state<HTMLDialogElement | null>(null)
  export { element as this }
  const classes = $derived(["ui-dialog ui-card ui-elevated", className])
</script>

<dialog bind:this={element} class={classes} {closedby} {...rest}>
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
  {#if actions}
    <div class={["ui-actions", actionsAlign && `ui-align-${actionsAlign}`]}>
      {@render actions()}
    </div>
  {/if}
</dialog>
