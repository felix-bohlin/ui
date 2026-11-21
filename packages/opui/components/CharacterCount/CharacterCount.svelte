<script lang="ts">
  import "../../elements/character-count.js"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let { class: className, label, ...rest }: Props = $props()
</script>

<opui-character-count
  aria-hidden="true"
  class={["ui-value", className]}
  {label}
  {...defined(rest)}
></opui-character-count>
