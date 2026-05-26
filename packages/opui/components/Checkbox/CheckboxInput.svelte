<script lang="ts">
  import type { CheckboxInputProps as Props } from "./types.svelte"

  export const title = "Checkbox Input" as const

  let { checked = $bindable(), indeterminate, ...rest }: Props = $props()
  let element = $state<HTMLInputElement | null>(null)
  export { element as this }
</script>

<input
  bind:this={element}
  bind:checked
  type="checkbox"
  data-indeterminate={indeterminate || undefined}
  {...rest}
/>
