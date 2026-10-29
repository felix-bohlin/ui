<script lang="ts">
  import "../../elements/toaster.js"
  import { untrack } from "svelte"
  import { warnMissingId } from "../dev"
  import type { Props } from "./types.svelte"

  let {
    align,
    class: className,
    closeLabel,
    duration,
    id,
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
  {...rest}
>
  <ol popover="manual"></ol>
  <div class="ui-sr-only" role="status"></div>
</opui-toaster>
