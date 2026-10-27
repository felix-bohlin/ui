<script lang="ts">
  import "../../elements/copy.js"
  import { untrack } from "svelte"
  import { warnMissingId } from "../dev"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    copiedLabel,
    id,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  untrack(() => warnMissingId("Copy", id))
</script>

<opui-copy
  class={["ui-copy", className]}
  copied-label={copiedLabel}
  {id}
  {...rest}
>
  {@render children?.()}
  <span class="ui-sr-only" role="status"></span>
</opui-copy>
