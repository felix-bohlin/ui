<script lang="ts">
  import "../../elements/toaster.js"
  import { untrack } from "svelte"
  import { warnMissingId } from "../dev"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    align,
    class: className,
    closeLabel,
    duration,
    id,
    limit,
    side,
    ...rest
  }: Props = $props()

  untrack(() => warnMissingId("Toaster", id))
</script>

<opui-toaster
  class={[
    "ui-toaster",
    side && side !== "block-end" && `ui-${side}`,
    align && align !== "end" && `ui-align-${align}`,
    className,
  ]}
  close-label={closeLabel}
  {duration}
  {id}
  {limit}
  {...defined(rest)}
>
  <ol popover="manual"></ol>
  <div class="ui-sr-only" role="status"></div>
  <div class="ui-sr-only" role="alert"></div>
</opui-toaster>
