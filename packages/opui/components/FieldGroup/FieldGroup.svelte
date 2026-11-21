<script lang="ts">
  import { getFieldGroupContext, setFieldGroupContext } from "./context.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    name,
    orientation,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const parent = getFieldGroupContext()
  setFieldGroupContext({
    get name() {
      return name || parent?.name
    },
  })
</script>

<div
  class={[
    "ui-field-group",
    orientation && orientation !== "auto" && `ui-${orientation}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</div>
