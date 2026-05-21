<script lang="ts">
  import type { RadioProps as Props } from "./types.svelte"
  import RadioInput from "./RadioInput.svelte"
  import { getContext } from "svelte"
  import type * as FieldSet from "../FieldSet/types.svelte"

  export const title = "Radio"

  const {
    class: className,
    critical,
    hideLabel,
    name,
    size,
    stack,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const currentFieldName = getContext<FieldSet.Context["name"]>("name")
  const finalName = $derived(name || currentFieldName)
  const currentFieldDescription =
    getContext<FieldSet.Context["description"]>("description")
  const classes = $derived([
    "ui-radio",
    size && `ui-${size}`,
    { "ui-stack": stack },
    className,
  ])
</script>

<label class={classes} data-invalid={critical || undefined}>
  <RadioInput
    aria-describedby={currentFieldDescription}
    name={finalName}
    {...rest}
  />
  <span class={[hideLabel ? "ui-sr-only" : "ui-label"]}
    >{@render children?.()}</span
  >
</label>
