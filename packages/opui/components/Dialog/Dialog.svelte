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
</script>

<dialog
  bind:this={element}
  class:list={["dialog card elevated", className]}
  {closedby}
  {...rest}
>
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
  {#if actions}
    <div class={["actions", actionsAlign && `align-${actionsAlign}`]}>
      {@render actions()}
    </div>
  {/if}
</dialog>
