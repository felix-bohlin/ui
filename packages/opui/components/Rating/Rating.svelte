<script lang="ts">
  import { untrack } from "svelte"
  import { seedChecked } from "../svelte"
  import { mergeStyle, pluralLabel } from "../style"
  import { ratingOf } from "./rating"
  import type { Props } from "./types.svelte"
  import type { SvelteHTMLElements } from "svelte/elements"

  let {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-label": ariaLabel,
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

  const rating = $derived(ratingOf(max, value))
  const invalid = $derived(error ? "true" : ariaInvalid)
</script>

{#if name}
  <fieldset
    aria-label={ariaLabel}
    class={["ui-rating", size && size !== "medium" && `ui-${size}`, className]}
    {disabled}
    {lang}
    {style}
    {...rest as SvelteHTMLElements["fieldset"]}
  >
    <legend>{label}</legend>{#if !required}
      <input
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid}
        aria-label={clearLabel}
        {name}
        type="radio"
        value={0}
        defaultChecked={untrack(() => rating.current === 0)}
        {@attach seedChecked(
          () => rating.current === 0,
          () => {
            value = 0
          },
        )}
        onchange={() => {
          value = 0
        }}
      />
    {/if}{#each rating.stars as star, index (index)}
      <input
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid}
        aria-label={pluralLabel(starLabel, star, lang)}
        {name}
        {required}
        type="radio"
        value={star}
        defaultChecked={untrack(() => rating.current === star)}
        {@attach seedChecked(
          () => rating.current === star,
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
    aria-label={ariaLabel ?? label}
    class={["ui-rating", size && size !== "medium" && `ui-${size}`, className]}
    {lang}
    max={rating.max}
    style={mergeStyle(
      { "--_max": rating.count === 5 ? undefined : rating.count },
      style,
    )}
    value={rating.value}
    {...rest as SvelteHTMLElements["meter"]}
  ></meter>
{/if}
