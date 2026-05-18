<script setup lang="ts">
import { Button, Drawer, DrawerFooter, DrawerHeader } from "opui-css/vue";
import { onMounted } from "vue";

onMounted(() => {
	const transparentToggle = document.querySelector(
		"#backdrop-transparent-toggle",
	);
	const drawers = document.querySelectorAll("dialog.drawer");

	transparentToggle?.addEventListener("change", (e) => {
		const isTransparent = e.target.checked;
		drawers.forEach((drawer) => {
			if (isTransparent) {
				drawer.classList.add("backdrop-transparent");
			} else {
				drawer.classList.remove("backdrop-transparent");
			}
		});
	});
});
</script>

<template>
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
  <template #header><DrawerHeader heading="Inline Start" /></template>
  <template #content>
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
    <p>
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
      amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
      incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
    </p>
    <p>
      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
      suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
      vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
      molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
      pariatur?
    </p>
  </template>
  <template #footer><DrawerFooter>
    <Button size="small" commandfor="drawer-inline-start" command="close"
      >Close</Button
    >
  </DrawerFooter></template>
</Drawer>

<Drawer id="drawer-inline-end" side="inline-end" closedby="any">
  <template #header><DrawerHeader heading="Inline End" /></template>
  <template #content>
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
    <p>
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
      amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
      incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
    </p>
    <p>
      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
      suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
      vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
      molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
      pariatur?
    </p>
  </template>
  <template #footer><DrawerFooter>
    <Button size="small" commandfor="drawer-inline-end" command="close"
      >Close</Button
    >
  </DrawerFooter></template>
</Drawer>

<Drawer id="drawer-block-start" side="block-start" closedby="any">
  <template #header><DrawerHeader heading="Block Start" /></template>
  <template #content>
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
  </template>
  <template #footer><DrawerFooter>
    <Button size="small" commandfor="drawer-block-start" command="close"
      >Close</Button
    >
  </DrawerFooter></template>
</Drawer>

<Drawer id="drawer-block-end" side="block-end" closedby="any">
  <template #header><DrawerHeader heading="Block End" /></template>
  <template #content>
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
  </template>
  <template #footer><DrawerFooter>
    <Button size="small" commandfor="drawer-block-end" command="close"
      >Close</Button
    >
  </DrawerFooter></template>
</Drawer>
</template>
