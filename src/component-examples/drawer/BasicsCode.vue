<script setup lang="ts">
import {
  Button,
  Checkbox,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  FieldGroup,
  FieldLegend,
  Fieldset,
  List,
  ListItem,
} from "opui-css/vue"
</script>

<template>
  <Button command="show-modal" commandfor="drawer-basics-3">Block start</Button>
  <Button command="show-modal" commandfor="drawer-basics-1"
    >Inline start</Button
  >
  <Button command="show-modal" commandfor="drawer-basics-2">Inline end</Button>
  <Button command="show-modal" commandfor="drawer-basics-4">Block end</Button>

  <Drawer id="drawer-basics-1" side="inline-start">
    <DrawerHeader closeButton>
      <DrawerTitle>Menu</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <List variant="transparent">
        <ListItem aria-current="page" href="#basics" label="My wall" />
        <ListItem href="#basics" label="My bands" />
        <ListItem href="#basics" label="Gear Talk" />
        <ListItem href="#basics" label="Settings" />
      </List>
    </DrawerContent>
    <DrawerFooter align="start">
      <Button command="close" commandfor="drawer-basics-1" size="small"
        >Sign out</Button
      >
    </DrawerFooter>
  </Drawer>

  <Drawer backdrop="transparent" id="drawer-basics-2" side="inline-end">
    <DrawerHeader closeButton>
      <DrawerTitle>Friday gig prep</DrawerTitle>
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
          ></path>
        </svg>
      </Button>
    </DrawerHeader>
    <DrawerContent aria-label="Gig details" role="region" tabindex="0">
      <p>
        Assigned to Lou Headstock, due Friday. Holly Humbucker checks the
        setlist, and the drummer promises (again) to bring the cymbals by
        Wednesday.
      </p>
      <p>
        The band booked this gig without telling you, so here is the totally rad
        catch-up plan: five rehearsals over two weeks, and no more surprises.
      </p>
      <p>
        Day 1: restring with fresh flatwounds, tune to drop D and play the root
        notes of every song until your fingers say thank you.
      </p>
      <p>
        Day 2: learn the new song the guitarist wrote, which has eleven chords,
        four key changes and one very long solo that is not yours.
      </p>
      <p>
        Day 4: practice the slap part in the bridge, with a short video that
        shows how to look cool while nobody watches the bassist.
      </p>
      <p>
        Day 7: full rehearsal with the band, where somebody will ask you to turn
        it down and somebody else will ask why you can't be heard.
      </p>
      <p>
        Day 14: soundcheck at the venue, where the sound engineer calls you the
        tall guitarist and the drummer gets all the credit.
      </p>
      <p>
        Keep the pedalboard under 10 pedals, with one tuner and no more than two
        fuzzes. Pack the spare strings last, once the cables are coiled.
      </p>
      <p>
        Send the setlist to the merch table before Thursday. They sell the
        shirts, so they need to know which songs have a bass solo (zero).
      </p>
      <p>
        Test every cable and the low B on the 5-string, in the rehearsal room
        and on the actual stage, before the doors open at eight.
      </p>
      <p>
        Holly Humbucker created the task on 3 March, and Lou Headstock moved it
        to Rocking on 5 March.
      </p>
    </DrawerContent>
    <DrawerFooter>
      <Button
        command="close"
        commandfor="drawer-basics-2"
        size="small"
        variant="filled"
        >Mark as done</Button
      >
    </DrawerFooter>
  </Drawer>

  <Drawer id="drawer-basics-3" side="block-start">
    <DrawerHeader closeButton>
      <DrawerTitle>Notifications</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <p>Holly Humbucker commented on Friday gig prep.</p>
      <p>Your setlist export is ready to download, woohoo.</p>
      <p>Lou Headstock invited you to Ignored Bassists Anonymous.</p>
    </DrawerContent>
    <DrawerFooter>
      <Button command="close" commandfor="drawer-basics-3" size="small"
        >Mark all as read</Button
      >
    </DrawerFooter>
  </Drawer>

  <Drawer id="drawer-basics-4" side="block-end">
    <DrawerHeader closeButton>
      <DrawerTitle>Filters</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <Fieldset>
        <FieldLegend>Status</FieldLegend>
        <FieldGroup name="status" orientation="horizontal">
          <Checkbox checked value="done">Done</Checkbox>
          <Checkbox checked value="in-progress">Rocking</Checkbox>
          <Checkbox value="open">Not yet</Checkbox>
        </FieldGroup>
      </Fieldset>
    </DrawerContent>
    <DrawerFooter>
      <p>24 tasks</p>
      <div class="ui-actions">
        <Button size="small">Reset</Button>
        <Button
          command="close"
          commandfor="drawer-basics-4"
          size="small"
          variant="filled"
          >Apply</Button
        >
      </div>
    </DrawerFooter>
  </Drawer>
</template>
