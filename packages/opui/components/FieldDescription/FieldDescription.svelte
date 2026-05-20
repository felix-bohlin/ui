<script lang="ts">
  import { setContext } from "svelte"
  import type { Props } from "./types.svelte"
  import type * as FieldSet from "../FieldSet/types.svelte"

  export const title = "Field Description" as const

  const { children, class: className, id, ...rest }: Props = $props()

  $effect(() => {
    setContext<FieldSet.Context["description"]>("description", id)
  })

  let element = $state<HTMLParagraphElement | null>(null)
  export { element as this }
</script>

<p bind:this={element} class={["field-description", className]} {...rest}>
  {@render children?.()}
</p>
