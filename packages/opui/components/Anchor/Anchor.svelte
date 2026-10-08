<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    alignment,
    class: className,
    id: idProp,
    style,
    trigger = "always",

    // Snippets
    anchored,
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()

  const isHover = $derived(trigger === "hover")
  const id = $derived(isHover ? (idProp ?? uid) : undefined)
</script>

<span
  class={["ui-anchor", className]}
  id={isHover ? undefined : idProp}
  style={`${alignment ? `--anchor-position-area: ${alignment};` : ""}${style ?? ""}` ||
    undefined}
  {...rest}
>
  {@render children?.()}
  <span class="ui-anchor-floating" {id} popover={isHover ? "hint" : undefined}>
    {@render anchored?.()}
  </span>
</span>
