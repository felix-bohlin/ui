<script lang="ts">
  import "../../elements/toaster.js"
  import { untrack } from "svelte"
  import { warnMissingId } from "../dev"
  import type { Props } from "./types.svelte"

  let { class: className, closeLabel, duration, id, ...rest }: Props = $props()

  untrack(() => warnMissingId("Toaster", id))
</script>

<opui-toaster
  class={["ui-toaster", className]}
  close-label={closeLabel}
  {duration}
  {id}
  {...rest}
>
  <ol popover="manual"></ol>
  <div class="ui-sr-only" role="status"></div>
</opui-toaster>
