<script lang="ts">
  import { untrack } from "svelte"
  import Anchor from "../Anchor/Anchor.svelte"
  import { warnMissingId } from "../dev"
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

  untrack(() => warnMissingId("Tooltip", id, "interestfor"))
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
