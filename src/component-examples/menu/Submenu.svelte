<script lang="ts">
  import { Button, ListItem, Menu } from "opui-css/svelte"

  const formats = [{ label: "PDF" }, { label: "PNG" }, { label: "SVG" }]
</script>

<Button command="toggle-popover" commandfor="menu-submenu-1" variant="outlined">
  File
</Button>
<Menu id="menu-submenu-1" items={[{ label: "New" }, { label: "Open" }]}>
  <ListItem
    as="button"
    command="toggle-popover"
    commandfor="menu-submenu-2"
    label="Export"
  >
    {#snippet end()}<svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M8.293 19.707a1 1 0 0 1 0-1.414L14.586 12l-6.293-6.293a1 1 0 1 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0"
        ></path>
      </svg>{/snippet}
    {#snippet submenu()}<Menu
        id="menu-submenu-2"
        items={formats}
        side="inline-end"
      />{/snippet}
  </ListItem>
</Menu>
