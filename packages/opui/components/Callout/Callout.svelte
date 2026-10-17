<script lang="ts">
  import { setCalloutContext } from "./context"
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
    variant && `ui-${variant}`,
    severity && `ui-${severity}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</article>
