<script lang="ts">
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let { class: className, line, shape = "rounded", ...rest }: Props = $props()
</script>

<span
  aria-hidden="true"
  class={[
    "ui-skeleton",
    { "ui-line": line },
    shape !== "rounded" && `ui-${shape}`,
    className,
  ]}
  {...defined(rest)}
></span>
