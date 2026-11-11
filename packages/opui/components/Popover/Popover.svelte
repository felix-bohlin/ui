<script lang="ts">
  import "../../elements/close-on-navigate.js"
  import { untrack } from "svelte"
  import { setPopoverContext } from "./context.svelte"
  import { warnMissingId } from "../dev"
  import { autoLabelledBy } from "../id"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    align,
    class: className,
    closeOnNavigate,
    id,
    popover = "auto",
    side,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const titleId = $derived(`${id || `popover-${uid}`}-title`)
  const labelledBy = $derived(autoLabelledBy(rest, titleId))
  untrack(() => warnMissingId("Popover", id))
  setPopoverContext({
    get id() {
      return id
    },
    get titleId() {
      return labelledBy
    },
  })
</script>

<div
  aria-labelledby={labelledBy}
  class={[
    "ui-popover",
    { "ui-align-end": align === "end" },
    side && side !== "block-end" && `ui-${side}`,
    className,
  ]}
  data-close-on-navigate={closeOnNavigate ? "" : undefined}
  {id}
  popover={popover === "auto" ? "" : popover}
  role="dialog"
  {...defined(rest)}
>
  {@render children?.()}
</div>
