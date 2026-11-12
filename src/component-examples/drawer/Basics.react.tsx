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
} from "opui-css/react"

export default function Basics() {
  return (
    <>
      <div className="example-compass">
        <Button command="show-modal" commandfor="drawer-basics-3">
          Block start
        </Button>
        <Button command="show-modal" commandfor="drawer-basics-1">
          Inline start
        </Button>
        <Button command="show-modal" commandfor="drawer-basics-2">
          Inline end
        </Button>
        <Button command="show-modal" commandfor="drawer-basics-4">
          Block end
        </Button>
      </div>

      <Drawer
        closeOnNavigate
        id="drawer-basics-1"
        scrollLock
        side="inline-start"
      >
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <List variant="transparent">
            <ListItem aria-current="page" href="#basics" label="Dashboard" />
            <ListItem href="#basics" label="Projects" />
            <ListItem href="#basics" label="Reports" />
            <ListItem href="#basics" label="Settings" />
          </List>
        </DrawerContent>
        <DrawerFooter align="start">
          <Button command="close" commandfor="drawer-basics-1" size="small">
            Sign out
          </Button>
        </DrawerFooter>
      </Drawer>

      <Drawer
        backdrop="transparent"
        id="drawer-basics-2"
        scrollLock
        side="inline-end"
      >
        <DrawerHeader>
          <DrawerTitle>Onboarding emails</DrawerTitle>
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
        <DrawerContent aria-label="Task details" role="region" tabIndex={0}>
          <p>
            Assigned to Lena Handén, due Friday. Hakki Hälinen reviews the copy,
            and the design team sends the new header images by Wednesday.
          </p>
          <p>
            The welcome series sends five emails over the first two weeks.
            Rewrite them for the new plans, and drop the one about the old
            desktop app.
          </p>
          <p>
            Day 1: a welcome from the team, with one button that creates the
            first project and a short list of what to try next.
          </p>
          <p>
            Day 2: how to import files from another service, which formats work,
            and what happens to comments and version history on the way in.
          </p>
          <p>
            Day 4: the keyboard shortcuts and the command menu, with a short
            video that shows how to find any file without leaving the keyboard.
          </p>
          <p>
            Day 7: sharing a project with people outside the team, what guests
            can see and change, and how to take their access back.
          </p>
          <p>
            Day 14: a reminder that the trial ends in three days, the price of
            each plan, and a link to the billing page.
          </p>
          <p>
            Keep each email under 150 words, with one button and no more than
            two links. Write the subject lines last, once the body text is
            final.
          </p>
          <p>
            Send the drafts to the support team before Thursday. They answer the
            replies, so they need to know what each email promises.
          </p>
          <p>
            Test every email in light and dark mode, on a phone and in the web
            version of the three biggest mail apps, before it goes out.
          </p>
          <p>
            Hakki Hälinen created the task on 3 March, and Lena Handén moved it
            to In progress on 5 March.
          </p>
        </DrawerContent>
        <DrawerFooter>
          <Button
            command="close"
            commandfor="drawer-basics-2"
            size="small"
            variant="filled"
          >
            Mark as done
          </Button>
        </DrawerFooter>
      </Drawer>

      <Drawer id="drawer-basics-3" scrollLock side="block-start">
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <p>Hakki Hälinen commented on Onboarding emails.</p>
          <p>Your export is ready to download.</p>
          <p>Lena Handén invited you to the Design team.</p>
        </DrawerContent>
        <DrawerFooter>
          <Button command="close" commandfor="drawer-basics-3" size="small">
            Mark all as read
          </Button>
        </DrawerFooter>
      </Drawer>

      <Drawer id="drawer-basics-4" scrollLock side="block-end">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <Fieldset>
            <FieldLegend>Status</FieldLegend>
            <FieldGroup name="status" orientation="horizontal">
              <Checkbox defaultChecked value="done">
                Done
              </Checkbox>
              <Checkbox defaultChecked value="in-progress">
                In progress
              </Checkbox>
              <Checkbox value="open">Open</Checkbox>
            </FieldGroup>
          </Fieldset>
        </DrawerContent>
        <DrawerFooter>
          <p>24 tasks</p>
          <div className="ui-actions">
            <Button size="small">Reset</Button>
            <Button
              command="close"
              commandfor="drawer-basics-4"
              size="small"
              variant="filled"
            >
              Apply
            </Button>
          </div>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
