<script lang="ts">
  import type { CheckboxInputProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    indeterminate = $bindable(),
    ...rest
  }: Props = $props()
  let element = $state<HTMLInputElement | null>(null)
  export { element as this }
</script>

<input
  bind:this={element}
  bind:checked
  bind:indeterminate
  type="checkbox"
  data-indeterminate={indeterminate || undefined}
  {...rest}
/>
