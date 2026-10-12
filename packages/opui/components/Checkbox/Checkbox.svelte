<script lang="ts">
  import { provideFieldRoot } from "../Field/root.svelte"
  import type { CheckboxProps as Props } from "./types.svelte"

  let {
    children,
    class: className,
    error,
    size,
    spread,
    stack,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  provideFieldRoot(`end-text-${uid}`, () => error)
</script>

<label
  class={[
    "ui-checkbox",
    size && `ui-${size}`,
    {
      "ui-stack": stack,
      "ui-spread": spread,
    },
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</label>
