<script lang="ts">
  import { Breadcrumb } from "opui-css/svelte"

  const fogFive = [
    { href: "#", label: "Marketplace" },
    { href: "#", label: "Basses" },
    { href: "#", label: "Five-string" },
    { href: "#", label: "Fretless" },
    { label: "Fog Five" },
  ]

  const groupEvent = [
    { href: "#", label: "Groups" },
    { href: "#", label: "Low End Society" },
    { label: "Friday jam night" },
  ]
</script>

<Breadcrumb
  aria-label="Fog Five breadcrumb"
  items={fogFive}
  menuLabel="More levels"
  overflow="menu"
/>
<Breadcrumb
  aria-label="Jam night breadcrumb"
  items={groupEvent}
  menuLabel="More levels"
  overflow="menu"
/>
