<script lang="ts">
  import type { Props } from "./types.svelte.ts"

  export const title = "List" as const

  let {
    bordered,
    class: className,
    dense,
    gutterless,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<ul
  class={[
    "list",
    {
      bordered,
      dense,
      gutterless,
    },
    variant,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</ul>
