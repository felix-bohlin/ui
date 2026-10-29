<script setup lang="ts">
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "opui-css/vue"
</script>

<template>
  <div class="example-compass">
    <Button commandfor="drawer-basics-3" command="show-modal"
      >Block Start</Button
    >
    <Button commandfor="drawer-basics-1" command="show-modal"
      >Inline Start</Button
    >
    <Button commandfor="drawer-basics-2" command="show-modal"
      >Inline End</Button
    >
    <Button commandfor="drawer-basics-4" command="show-modal">Block End</Button>
  </div>

  <Drawer id="drawer-basics-1" scrollLock side="inline-start">
    <DrawerHeader>
      <DrawerTitle>Inline Start</DrawerTitle>
      <Button aria-label="Edit" round size="small">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
          />
        </svg>
      </Button>
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
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
      <p>
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt.
      </p>
      <p>
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit, sed quia non numquam eius modi tempora
        incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
      </p>
      <p>
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
      </p>
      <p>
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur.
      </p>
      <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident.
      </p>
      <p>
        Similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button size="small" commandfor="drawer-basics-1" command="close"
        >Close</Button
      >
    </DrawerFooter>
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
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button size="small" commandfor="drawer-basics-2" command="close"
        >Close</Button
      >
    </DrawerFooter>
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
    <DrawerFooter>
      <Button size="small" commandfor="drawer-basics-3" command="close"
        >Close</Button
      >
    </DrawerFooter>
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
    <DrawerFooter>
      <Button size="small" commandfor="drawer-basics-4" command="close"
        >Close</Button
      >
    </DrawerFooter>
  </Drawer>
</template>
