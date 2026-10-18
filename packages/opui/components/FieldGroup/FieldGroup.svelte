<script lang="ts">
  import { getFieldGroupContext, setFieldGroupContext } from "./context.svelte"
  import type { Props } from "./types.svelte"

  let { children, class: className, direction, name, ...rest }: Props = $props()

  const parent = getFieldGroupContext()
  setFieldGroupContext({
    get name() {
      return name || parent?.name
    },
  })
</script>

<div
  class={["ui-field-group", direction && `ui-${direction}`, className]}
  {...rest}
>
  {@render children?.()}
</div>
