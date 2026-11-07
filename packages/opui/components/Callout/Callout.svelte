<script lang="ts">
  import { setCalloutContext } from "./context.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    severity,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  setCalloutContext({
    get severity() {
      return severity
    },
  })
</script>

<article
  class={[
    "ui-callout",
    severity && `ui-${severity}`,
    variant && variant !== "tonal" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</article>
