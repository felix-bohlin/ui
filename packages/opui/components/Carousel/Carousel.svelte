<script lang="ts">
  import { counterLabel, cssString, mergeStyle } from "../style"
  import { defined } from "../attrs"
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
      "ui-markers": markers,
      "ui-peek": peek,
      "ui-persistent-buttons": persistentButtons,
      "ui-stretch": stretch,
      "ui-vertical": orientation === "vertical",
    },
    align && align !== "start" && `ui-align-${align}`,
    buttons && buttons !== "inside" && `ui-buttons-${buttons}`,
    className,
  ]}
  style={mergeStyle(
    {
      "--_button-next-label": nextLabel && cssString(nextLabel),
      "--_button-previous-label": previousLabel && cssString(previousLabel),
      "--_items-per-view": itemsPerView,
      "--_marker-label":
        markerLabel && counterLabel(markerLabel, "ui-carousel-item"),
      "--_media-aspect-ratio": aspectRatio,
    },
    style,
  )}
  role="list"
  {...defined(rest)}
>
  {@render children?.()}
</ul>
