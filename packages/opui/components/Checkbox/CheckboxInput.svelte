<script lang="ts">
  import { onMount } from "svelte"
  import { initCheckbox } from "../../css/js/checkbox.js"
  import type { CheckboxInputProps as Props } from "./types.svelte"

  export const title = "Checkbox Input" as const

  const { indeterminate, ...rest }: Props = $props()
  let element = $state<HTMLInputElement | null>(null)
  export { element as this }

  onMount(() => {
    initCheckbox()
  })
</script>

<input
  bind:this={element}
  type="checkbox"
  data-indeterminate={indeterminate || undefined}
  {...rest}
/>
