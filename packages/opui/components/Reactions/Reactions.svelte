<script lang="ts">
  import "../../elements/reactions.js"
  import { hydrated } from "../svelte"
  import ToggleButton from "../ToggleButton/ToggleButton.svelte"
  import ToggleGroup from "../ToggleGroup/ToggleGroup.svelte"
  import { defined } from "../attrs"
  import { classAttrs } from "../cx"
  import type { Props } from "./types.svelte"

  let {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    class: className,
    items = [],
    name,
    onreaction,
    quick,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const used = $derived(items.find((item) => item.value === quick?.value))
  const pills = $derived(
    quick
      ? [used ?? quick, ...items.filter((item) => item.value !== quick?.value)]
      : items,
  )
</script>

<opui-reactions
  class={["ui-reactions", className]}
  quick-label={quick?.["aria-label"]}
  quick-text={quick?.label}
  quick-value={quick?.value}
  {onreaction}
  data-hydrating=""
  {@attach hydrated}
  {...defined(rest)}
>
  <ToggleGroup
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    multiple
    {name}
  >
    {#each pills as item, index (index)}
      <ToggleButton
        aria-label={item["aria-label"]}
        checked={!!item.checked}
        {...classAttrs([{ "ui-unused": quick && !used && index === 0 }])}
        value={item.value}
      >
        <span aria-hidden="true">{item.label}</span>
      </ToggleButton>
    {/each}
  </ToggleGroup>
  {@render children?.()}
  <span class="ui-sr-only" role="status"></span>
</opui-reactions>
