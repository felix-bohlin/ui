<script lang="ts">
  import {
    Button,
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "opui-css/svelte"
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
  <DrawerHeader commandfor="drawer-inline-start">
    <DrawerTitle>Inline Start</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
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
  </DrawerContent>
  <DrawerFooter>
    <Button size="small" commandfor="drawer-inline-start" command="close"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-inline-end" side="inline-end" closedby="any">
  <DrawerHeader commandfor="drawer-inline-end">
    <DrawerTitle>Inline End</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
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
  </DrawerContent>
  <DrawerFooter>
    <Button size="small" commandfor="drawer-inline-end" command="close"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-block-start" side="block-start" closedby="any">
  <DrawerHeader commandfor="drawer-block-start">
    <DrawerTitle>Block Start</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
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
  </DrawerContent>
  <DrawerFooter>
    <Button size="small" commandfor="drawer-block-start" command="close"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>

<Drawer id="drawer-block-end" side="block-end" closedby="any">
  <DrawerHeader commandfor="drawer-block-end">
    <DrawerTitle>Block End</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
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
  </DrawerContent>
  <DrawerFooter>
    <Button size="small" commandfor="drawer-block-end" command="close"
      >Close</Button
    >
  </DrawerFooter>
</Drawer>
