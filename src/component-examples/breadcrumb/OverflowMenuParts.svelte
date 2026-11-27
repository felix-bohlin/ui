<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Button, Menu } from "opui-css/svelte"
</script>

<Breadcrumb aria-label="Tour breadcrumb" overflow="menu">
  <BreadcrumbItem href="#" label="Groups" />
  <li>
    <Button
      aria-label="More levels"
      command="toggle-popover"
      commandfor="breadcrumb-overflow-menu-parts-1"
      round
      size="x-small">…</Button
    >
    <Menu
      id="breadcrumb-overflow-menu-parts-1"
      items={[
        { href: "#", label: "Low End Society" },
        { href: "#", label: "Events" },
      ]}
    />
  </li>
  <BreadcrumbItem href="#" label="Low End Society" />
  <BreadcrumbItem href="#" label="Events" />
  <BreadcrumbItem href="#" label="Spring tour" />
  <BreadcrumbItem current label="Setlist" />
</Breadcrumb>
