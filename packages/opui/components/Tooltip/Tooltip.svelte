<script lang="ts">
  import Anchor from "../Anchor/Anchor.svelte"
  import type { Props } from "./types.svelte"

  let {
    alignment,
    arrow,
    class: className,
    id,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<Anchor
  {alignment}
  class={["ui-tooltip", { "ui-with-arrow": arrow }, className]}
  {id}
  trigger="hover"
  {...rest}
>
  {@render children?.()}
</Anchor>
