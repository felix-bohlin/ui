<script lang="ts">
  import { mergeStyle } from "../style"
  import type { Props } from "./types.svelte"

  let {
    align,
    aspectRatio,
    buttons,
    class: className,
    itemsPerView,
    markers,
    orientation,
    peek,
    persistentButtons,
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
    { "--_items-per-view": itemsPerView, "--_media-aspect-ratio": aspectRatio },
    style,
  )}
  {...rest}
>
  {@render children?.()}
</ul>
