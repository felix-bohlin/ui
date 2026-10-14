<script lang="ts">
  import { mergeStyle } from "../style"
  import type { Props } from "./types.svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    class: className,
    clearLabel = "No rating",
    disabled,
    error,
    label,
    max = 5,
    name,
    required,
    size,
    starLabel = (value: number) => (value === 1 ? "1 star" : `${value} stars`),
    style,
    value = $bindable(),
    ...rest
  }: Props = $props()

  const count = $derived(Number(max))
  const stars = $derived(Array.from({ length: count }, (_, index) => index + 1))
</script>

{#if name}
  <fieldset
    class={["ui-rating", size && `ui-${size}`, className]}
    {disabled}
    {style}
    {...rest}
  >
    <legend>{label}</legend>
    {#if !required}
      <input
        aria-describedby={ariaDescribedBy}
        aria-invalid={error ? "true" : rest["aria-invalid"]}
        aria-label={clearLabel}
        bind:group={value}
        {name}
        type="radio"
        value={0}
      />
    {/if}
    {#each stars as star (star)}
      <input
        aria-describedby={ariaDescribedBy}
        aria-invalid={error ? "true" : rest["aria-invalid"]}
        aria-label={starLabel(star)}
        bind:group={value}
        {name}
        {required}
        type="radio"
        value={star}
      />
    {/each}
  </fieldset>
{:else}
  <meter
    aria-describedby={ariaDescribedBy}
    aria-label={label}
    class={["ui-rating", size && `ui-${size}`, className]}
    {max}
    style={mergeStyle({ "--_max": count === 5 ? undefined : count }, style)}
    value={value ?? 0}
    {...rest}
  ></meter>
{/if}
