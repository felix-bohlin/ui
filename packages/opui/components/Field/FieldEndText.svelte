<script lang="ts">
  import { onDestroy } from "svelte"
  import { getFieldRoot } from "./context"
  import type { FieldEndTextProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()

  const field = getFieldRoot()
  const unregister = field?.register("end-text")
  onDestroy(() => unregister?.())
</script>

<span class={["ui-end-text", className]} id={field?.endTextId} {...rest}>
  {@render children?.()}
</span>
