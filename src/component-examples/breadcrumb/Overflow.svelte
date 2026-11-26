<script lang="ts">
  import { Breadcrumb } from "opui-css/svelte"

  const items = [
    { href: "#", label: "Marketplace" },
    { href: "#", label: "Basses" },
    { href: "#", label: "Five-string" },
    { href: "#", label: "Fretless" },
    { label: "Sandberg VM5" },
  ]
</script>

<Breadcrumb
  aria-label="Breadcrumb"
  {items}
  overflow="wrap"
  style="max-inline-size: 20rem"
/>
<Breadcrumb
  aria-label="Breadcrumb"
  {items}
  overflow="scroll"
  style="max-inline-size: 20rem"
/>
<Breadcrumb
  aria-label="Breadcrumb"
  {items}
  overflow="shrink"
  style="max-inline-size: 20rem"
/>
