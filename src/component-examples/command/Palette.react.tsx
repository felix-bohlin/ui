import {
  Button,
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
  Dialog,
  ListItem,
} from "opui-css/react"

export default function Palette() {
  return (
    <>
      <Button
        commandfor="command-palette-1"
        command="show-modal"
        variant="outlined"
      >
        Open command palette
      </Button>

      <Dialog
        aria-label="Command palette"
        closedby="any"
        id="command-palette-1"
      >
        <Command>
          <CommandInput
            aria-label="Search commands"
            placeholder="Search commands"
          />
          <CommandList>
            <CommandGroup label="Actions">
              <ListItem
                as="button"
                command="close"
                commandfor="command-palette-1"
                label="New file"
              />
              <ListItem
                as="button"
                command="close"
                commandfor="command-palette-1"
                label="New folder"
              />
              <ListItem
                as="button"
                command="close"
                commandfor="command-palette-1"
                label="Invite people"
              />
            </CommandGroup>
            <CommandGroup label="Pages">
              <ListItem href="#palette" label="Dashboard" />
              <ListItem href="#palette" label="Billing" />
              <ListItem href="#palette" label="Settings" />
            </CommandGroup>
          </CommandList>
        </Command>
      </Dialog>
    </>
  )
}
