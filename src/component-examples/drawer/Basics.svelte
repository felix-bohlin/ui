<script lang="ts">
  import {
    Button,
    Drawer,
    DrawerContent,
    DrawerActions,
    DrawerHeader,
    DrawerTitle,
  } from "opui-css/svelte"
</script>

<div class="example-compass">
  <Button commandfor="drawer-basics-3" command="show-modal">Block Start</Button>
  <Button commandfor="drawer-basics-1" command="show-modal">Inline Start</Button
  >
  <Button commandfor="drawer-basics-2" command="show-modal">Inline End</Button>
  <Button commandfor="drawer-basics-4" command="show-modal">Block End</Button>
</div>

<Drawer id="drawer-basics-1" scrollLock side="inline-start">
  <DrawerHeader>
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
  <DrawerActions>
    <Button size="small" commandfor="drawer-basics-1" command="close"
      >Close</Button
    >
  </DrawerActions>
</Drawer>

<Drawer id="drawer-basics-2" scrollLock side="inline-end">
  <DrawerHeader>
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
  <DrawerActions>
    <Button size="small" commandfor="drawer-basics-2" command="close"
      >Close</Button
    >
  </DrawerActions>
</Drawer>

<Drawer id="drawer-basics-3" scrollLock side="block-start">
  <DrawerHeader>
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
  <DrawerActions>
    <Button size="small" commandfor="drawer-basics-3" command="close"
      >Close</Button
    >
  </DrawerActions>
</Drawer>

<Drawer id="drawer-basics-4" scrollLock side="block-end">
  <DrawerHeader>
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
  <DrawerActions>
    <Button size="small" commandfor="drawer-basics-4" command="close"
      >Close</Button
    >
  </DrawerActions>
</Drawer>
