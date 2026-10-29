<script lang="ts">
  import "../../elements/copy.js"
  import { untrack } from "svelte"
  import { warnMissingId } from "../dev"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    copiedLabel,
    failedLabel,
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
  failed-label={failedLabel}
  {id}
  {...rest}
>
  {@render children?.()}
  <span class="ui-sr-only" role="status"></span>
  <span aria-hidden="true" class="ui-floating" popover=""></span>
</opui-copy>
