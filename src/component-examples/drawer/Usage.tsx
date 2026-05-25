import { Button, Drawer, DrawerFooter, DrawerHeader } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="drawer-examples">
        <Button class="left" commandfor="solid-drawer-inline-start" command="show-modal">Inline Start</Button>
        <Button class="right" commandfor="solid-drawer-inline-end" command="show-modal">Inline End</Button>
      </div>
      <Drawer id="solid-drawer-inline-start" side="inline-start"
        header={<DrawerHeader heading="Inline Start" />}
        content={<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo.</p>}
        footer={<DrawerFooter><Button size="small" commandfor="solid-drawer-inline-start" command="close">Close</Button></DrawerFooter>}
      />
      <Drawer id="solid-drawer-inline-end" side="inline-end"
        header={<DrawerHeader heading="Inline End" />}
        content={<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo.</p>}
        footer={<DrawerFooter><Button size="small" commandfor="solid-drawer-inline-end" command="close">Close</Button></DrawerFooter>}
      />
    </>
  )
}
