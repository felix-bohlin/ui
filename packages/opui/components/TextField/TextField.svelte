<script lang="ts">
  import { provideFieldRoot } from "../Field/root.svelte"
  import type { Props } from "./types.svelte"

  let {
    autoFit,
    children,
    class: className,
    error,
    size,
    spread,
    variant,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  provideFieldRoot(`end-text-${uid}`, () => error)
</script>

<label
  class={[
    "ui-text-field",
    size && `ui-${size}`,
    {
      "ui-auto-fit": autoFit,
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</label>
