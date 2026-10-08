<script lang="ts">
  import { Button, Drawer, DrawerFooter, DrawerHeader } from "opui-css/svelte"
</script>

<div class="drawer-examples">
  <Button class="top" commandfor="drawer-block-start" command="show-modal"
    >Block Start</Button
  >
  <Button class="left" commandfor="drawer-inline-start" command="show-modal"
    >Inline Start</Button
  >
  <Button class="right" commandfor="drawer-inline-end" command="show-modal"
    >Inline End</Button
  >
  <Button class="bottom" commandfor="drawer-block-end" command="show-modal"
    >Block End</Button
  >
</div>

<Drawer id="drawer-inline-start" side="inline-start" closedby="any">
  {#snippet header()}
    <DrawerHeader commandfor="drawer-inline-start" heading="Inline Start" />
  {/snippet}
  {#snippet content()}
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </p>
  {/snippet}
  {#snippet footer()}<DrawerFooter>
      <Button size="small" commandfor="drawer-inline-start" command="close"
        >Close</Button
      >
    </DrawerFooter>{/snippet}
</Drawer>

<Drawer id="drawer-inline-end" side="inline-end" closedby="any">
  {#snippet header()}
    <DrawerHeader commandfor="drawer-inline-end" heading="Inline End" />
  {/snippet}
  {#snippet content()}
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </p>
  {/snippet}
  {#snippet footer()}<DrawerFooter>
      <Button size="small" commandfor="drawer-inline-end" command="close"
        >Close</Button
      >
    </DrawerFooter>{/snippet}
</Drawer>

<Drawer id="drawer-block-start" side="block-start" closedby="any">
  {#snippet header()}
    <DrawerHeader commandfor="drawer-block-start" heading="Block Start" />
  {/snippet}
  {#snippet content()}
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  {/snippet}
  {#snippet footer()}<DrawerFooter>
      <Button size="small" commandfor="drawer-block-start" command="close"
        >Close</Button
      >
    </DrawerFooter>{/snippet}
</Drawer>

<Drawer id="drawer-block-end" side="block-end" closedby="any">
  {#snippet header()}
    <DrawerHeader commandfor="drawer-block-end" heading="Block End" />
  {/snippet}
  {#snippet content()}
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  {/snippet}
  {#snippet footer()}<DrawerFooter>
      <Button size="small" commandfor="drawer-block-end" command="close"
        >Close</Button
      >
    </DrawerFooter>{/snippet}
</Drawer>
