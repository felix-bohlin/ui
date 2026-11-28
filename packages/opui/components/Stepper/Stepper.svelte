<script lang="ts">
  import StepperItem from "./StepperItem.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    complete,
    completeLabel,
    current,
    errorLabel,
    items,
    orientation,
    size,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<ol
  class={[
    "ui-stepper",
    orientation && orientation !== "auto" && `ui-${orientation}`,
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {...rest}
>
  {#each items as item, index (index)}
    <StepperItem
      {completeLabel}
      {errorLabel}
      {...item}
      current={item.current || index === current}
      state={item.state ??
        (complete || (current !== undefined && index < current)
          ? "complete"
          : undefined)}
    />
  {/each}
  {@render children?.()}
</ol>
