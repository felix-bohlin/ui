<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    align,
    buttons = true,
    class: className,
    label,
    markers,
    orientation,
    peek,
    persistentButtons,
    perView,
    stretch,
    style,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<ul
  aria-label={label}
  class={[
    "ui-carousel",
    {
      "ui-buttons-outside": buttons === "outside",
      "ui-buttons-persistent": persistentButtons,
      "ui-peek": peek,
      "ui-stretch": stretch,
      "ui-vertical": orientation === "vertical",
      "ui-with-buttons": buttons,
      "ui-with-markers": markers,
    },
    align && align !== "start" && `ui-align-${align}`,
    className,
  ]}
  style={`${perView ? `--_per-view: ${perView};` : ""}${style ?? ""}` ||
    undefined}
  {...rest}
>
  {@render children?.()}
</ul>
