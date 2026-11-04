<script lang="ts">
  import StepperItem from "./StepperItem.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    complete,
    completedLabel,
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
  {#each items ?? [] as item, index (index)}
    <StepperItem
      {completedLabel}
      {errorLabel}
      {...item}
      complete={item.complete ||
        complete ||
        (current !== undefined && index < current)}
      current={item.current || index === current}
    />
  {/each}
  {@render children?.()}
</ol>
