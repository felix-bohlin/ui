<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as: Tag = "fieldset",
    children,
    class: className,
    ...rest
  }: Props = $props()
</script>

<svelte:element
  this={Tag}
  class={["ui-fieldset", className]}
  role={Tag === "fieldset" ? undefined : "group"}
  {...rest}
>
  {@render children?.()}
</svelte:element>
