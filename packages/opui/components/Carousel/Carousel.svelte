<script lang="ts">
  import { mergeStyle } from "../style"
  import type { Props } from "./types.svelte"

  let {
    align,
    aspectRatio,
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
  style={mergeStyle(
    { "--_per-view": perView, "--_media-aspect-ratio": aspectRatio },
    style,
  )}
  {...rest}
>
  {@render children?.()}
</ul>
