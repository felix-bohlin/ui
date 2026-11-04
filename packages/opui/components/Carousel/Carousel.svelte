<script lang="ts">
  import { counterLabel, cssString, mergeStyle } from "../style"
  import type { Props } from "./types.svelte"

  let {
    align,
    aspectRatio,
    buttons,
    class: className,
    itemsPerView,
    markerLabel,
    markers,
    nextLabel,
    orientation,
    peek,
    persistentButtons,
    previousLabel,
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
      "ui-persistent-buttons": persistentButtons,
      "ui-peek": peek,
      "ui-stretch": stretch,
      "ui-vertical": orientation === "vertical",
      "ui-markers": markers,
    },
    align && align !== "start" && `ui-align-${align}`,
    buttons && buttons !== "inside" && `ui-buttons-${buttons}`,
    className,
  ]}
  style={mergeStyle(
    {
      "--_button-next-label": nextLabel && cssString(nextLabel),
      "--_button-prev-label": previousLabel && cssString(previousLabel),
      "--_items-per-view": itemsPerView,
      "--_marker-label":
        markerLabel && counterLabel(markerLabel, "ui-carousel-item"),
      "--_media-aspect-ratio": aspectRatio,
    },
    style,
  )}
  {...rest}
>
  {@render children?.()}
</ul>
