<script lang="ts">
  import { getFieldContext, setFieldContext } from "./context"
  import type { Props } from "./types.svelte"

  let {
    children,
    class: className,
    direction,
    name,
    ref = $bindable(null),
    ...rest
  }: Props = $props()

  const parent = getFieldContext()
  setFieldContext({
    get name() {
      return name || parent?.name
    },
  })
</script>

<div
  bind:this={ref}
  class={["ui-field-group", direction && `ui-${direction}`, className]}
  {...rest}
  role="group"
>
  {@render children?.()}
</div>
