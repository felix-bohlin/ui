<script lang="ts">
  import Anchor from "../Anchor/Anchor.svelte"
  import type { Props } from "./types.svelte"

  let {
    arrow,
    class: className,
    id,
    positionArea,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<Anchor
  class={["ui-tooltip", { "ui-arrow": arrow }, className]}
  {id}
  {positionArea}
  trigger="hover"
  {...rest}
>
  {@render children?.()}
</Anchor>
