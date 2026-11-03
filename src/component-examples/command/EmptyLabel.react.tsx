import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
  ListItem,
} from "opui-css/react"

export default function EmptyLabel() {
  return (
    <Command emptyLabel="No fruit matches" variant="outlined">
      <CommandInput aria-label="Search fruit" defaultValue="Kiwi" />
      <CommandList>
        <CommandGroup>
          <ListItem as="button" label="Apple" />
          <ListItem as="button" label="Banana" />
          <ListItem as="button" label="Cherry" />
          <ListItem as="button" label="Mango" />
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
