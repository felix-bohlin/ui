<script lang="ts">
  import RadioInput from "./RadioInput.svelte"
  import type { RadioProps as Props } from "./types.svelte"

  export const title = "Radio"

  const {
    class: className,
    error,
    hideLabel,
    name,
    size,
    stack,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const description = ""
  const classes = $derived([
    "ui-radio",
    size && `ui-${size}`,
    { "ui-stack": stack },
    className,
  ])
</script>

<label class={classes} data-invalid={error || undefined}>
  <RadioInput aria-describedby={description} {...rest} />
  <span class={[hideLabel ? "ui-sr-only" : "ui-label"]}
    >{@render children?.()}</span
  >
</label>
