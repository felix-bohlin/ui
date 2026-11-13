<script lang="ts">
  import { untrack } from "svelte"
  import { seedChecked } from "../svelte"
  import { mergeStyle, pluralLabel } from "../style"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    class: className,
    clearLabel = "No rating",
    disabled,
    error,
    label,
    lang,
    max = 5,
    name,
    required,
    size,
    starLabel = { one: "{count} star", other: "{count} stars" },
    style,
    value = $bindable(),
    ...rest
  }: Props = $props()

  const count = $derived(Number(max))
  const stars = $derived(Array.from({ length: count }, (_, index) => index + 1))
  const current = $derived(Number(value))
  const invalid = $derived(error ? "true" : ariaInvalid)
</script>

{#if name}
  <fieldset
    class={["ui-rating", size && size !== "medium" && `ui-${size}`, className]}
    {disabled}
    {lang}
    {style}
    {...rest}
  >
    <legend>{label}</legend>{#if !required}
      <input
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid}
        aria-label={clearLabel}
        {name}
        type="radio"
        value={0}
        defaultChecked={untrack(() => current === 0)}
        {@attach seedChecked(
          () => current === 0,
          () => {
            value = 0
          },
        )}
        onchange={() => {
          value = 0
        }}
      />
    {/if}{#each stars as star, index (index)}
      <input
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid}
        aria-label={pluralLabel(starLabel, star, lang)}
        {name}
        {required}
        type="radio"
        value={star}
        defaultChecked={untrack(() => current === star)}
        {@attach seedChecked(
          () => current === star,
          () => {
            value = star
          },
        )}
        onchange={() => {
          value = star
        }}
      />
    {/each}
  </fieldset>
{:else}
  <meter
    aria-describedby={ariaDescribedBy}
    aria-label={label}
    class={["ui-rating", size && size !== "medium" && `ui-${size}`, className]}
    {lang}
    {max}
    style={mergeStyle({ "--_max": count === 5 ? undefined : count }, style)}
    value={value ?? 0}
    {...defined(rest)}
  ></meter>
{/if}
