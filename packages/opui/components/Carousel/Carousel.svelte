<script lang="ts">
  import { mergeStyle } from "../style"
  import type { Props } from "./types.svelte"

  let {
    align,
    aspectRatio,
    buttons = true,
    class: className,
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
  class={[
    "ui-carousel",
    {
      "ui-buttons-outside": buttons === "outside",
      "ui-persistent-buttons": persistentButtons,
      "ui-peek": peek,
      "ui-stretch": stretch,
      "ui-vertical": orientation === "vertical",
      "ui-buttons": buttons,
      "ui-markers": markers,
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
