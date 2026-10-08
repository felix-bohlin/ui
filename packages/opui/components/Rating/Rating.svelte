<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
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
  const current = $derived(Number(value))
  const invalid = $derived(error ? { "aria-invalid": "true" as const } : {})
</script>

{#if name}
  <fieldset
    class={["ui-rating", size && `ui-${size}`, className]}
    {disabled}
    {style}
    {...rest}
  >
    {#if label}
      <legend>{label}</legend>
    {/if}
    {#if !required}
      <input
        aria-label={clearLabel}
        checked={current === 0}
        {name}
        onchange={() => (value = 0)}
        type="radio"
        value="0"
        {...invalid}
      />
    {/if}
    {#each stars as star (star)}
      <input
        aria-label={starLabel(star)}
        checked={current === star}
        {name}
        onchange={() => (value = star)}
        {required}
        type="radio"
        value={star}
        {...invalid}
      />
    {/each}
  </fieldset>
{:else}
  <meter
    aria-label={label}
    class={["ui-rating", size && `ui-${size}`, className]}
    {max}
    style={[count === 5 ? undefined : `--_max: ${count};`, style]
      .filter(Boolean)
      .join(" ") || undefined}
    {value}
    {...rest}
  ></meter>
{/if}
