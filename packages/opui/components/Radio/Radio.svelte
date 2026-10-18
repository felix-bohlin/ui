<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { warnUnnamed } from "../dev"
  import { idRefs } from "../id"
  import RadioInput from "./RadioInput.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    error,
    group = $bindable(),
    hideLabel,
    size,
    spread,
    stack,

    // Snippets
    children,
    endText,
    ...rest
  }: Props = $props()

  const id = $props.id()
  const endTextId = $derived(endText ? `end-text-${id}` : undefined)
  const describedBy = $derived(idRefs(endTextId, rest["aria-describedby"]))

  untrack(() =>
    warnUnnamed(
      "Radio",
      children || rest["aria-label"] || rest["aria-labelledby"],
    ),
  )
</script>

<label
  class={[
    "ui-radio",
    size && `ui-${size}`,
    {
      "ui-stack": stack,
      "ui-spread": spread,
    },
    className,
  ]}
>
  <RadioInput
    {...rest}
    aria-describedby={describedBy}
    aria-invalid={error ? "true" : rest["aria-invalid"]}
    bind:group
  />
  {#if children}
    <span class={[hideLabel ? "ui-sr-only" : "ui-label"]}>
      {@render children()}
    </span>
  {/if}
  {#if endText}
    <span id={endTextId} class="ui-end-text">
      {@render content(endText)}
    </span>
  {/if}
</label>
