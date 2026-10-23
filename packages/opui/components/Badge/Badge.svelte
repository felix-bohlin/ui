<script lang="ts">
  import Anchor from "../Anchor/Anchor.svelte"
  import AnchorContent from "../Anchor/AnchorContent.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    color,
    corner,
    dot,
    hideLabel,
    invisible,
    label,

    // Snippets
    children,
    indicator,
    ...rest
  }: Props = $props()
</script>

<Anchor
  class={[
    "ui-badge",
    {
      "ui-dot": dot,
      "ui-invisible": invisible,
    },
    color && `ui-${color}`,
    corner && corner !== "start-end" && `ui-${corner}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
  <AnchorContent>
    <span class="ui-indicator">
      {#if dot || hideLabel}
        {#if !dot && indicator}<span aria-hidden="true"
            >{@render indicator()}</span
          >{/if}
        {#if label}<span class="ui-sr-only">{label}</span>{/if}
      {:else}
        {label}{@render indicator?.()}
      {/if}
    </span>
  </AnchorContent>
</Anchor>
