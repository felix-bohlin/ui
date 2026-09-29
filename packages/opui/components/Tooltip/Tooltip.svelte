<script lang="ts">
  import Anchor from "../Anchor/Anchor.svelte"
  import type { Props } from "./types.svelte"

  let {
    alignment,
    arrow,
    class: className,
    id,
    label,
    ref = $bindable(null),

    // Snippets
    children,
    content,
    ...rest
  }: Props = $props()
</script>

<Anchor
  bind:ref
  {alignment}
  class={["ui-tooltip", { "ui-with-arrow": arrow }, className]}
  {id}
  trigger="hover"
  {...rest}
>
  {@render children?.()}
  {#snippet anchored()}
    {label}
    {@render content?.()}
  {/snippet}
</Anchor>
