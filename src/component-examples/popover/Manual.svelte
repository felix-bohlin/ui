<script lang="ts">
  import {
    Button,
    Popover,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTitle,
  } from "opui-css/svelte"
</script>

<Button
  command="toggle-popover"
  commandfor="popover-manual-1"
  variant="outlined"
>
  Shipping
</Button>
<Popover id="popover-manual-1" popover="manual">
  <PopoverHeader>
    <PopoverTitle as="h3">Free shipping</PopoverTitle>
  </PopoverHeader>
  <PopoverContent>
    <p>Orders over 50 euros ship for free within the EU.</p>
  </PopoverContent>
  <PopoverFooter align="start">
    <Button command="hide-popover" commandfor="popover-manual-1">Got it</Button>
  </PopoverFooter>
</Popover>
