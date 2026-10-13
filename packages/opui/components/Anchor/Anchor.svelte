<script lang="ts">
  import { setAnchorContext } from "./context"
  import type { Props } from "./types.svelte"

  let {
    alignment,
    class: className,
    id: idProp,
    style,
    trigger = "always",

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()

  const isHover = $derived(trigger === "hover")
  const id = $derived(isHover ? (idProp ?? uid) : undefined)

  setAnchorContext({
    get floatingId() {
      return id
    },
    get popover() {
      return isHover ? ("hint" as const) : undefined
    },
  })
</script>

<span
  class={["ui-anchor", className]}
  id={isHover ? undefined : idProp}
  style={`${alignment ? `--anchor-position-area: ${alignment};` : ""}${style ?? ""}` ||
    undefined}
  {...rest}
>
  {@render children?.()}
</span>
