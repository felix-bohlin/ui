<script lang="ts">
  import { Breadcrumb } from "opui-css/svelte"

  const items = [
    { href: "#", label: "Groups" },
    { href: "#", label: "Low End Society" },
    { href: "#", label: "Events" },
    { label: "Friday jam night" },
  ]
</script>

<Breadcrumb aria-label="Event breadcrumb" {items} />
