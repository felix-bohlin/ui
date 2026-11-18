/** @jsxImportSource @solidjs/web */
import { createSignal, For } from "solid-js"
import {
  SortableTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/solid"

const keys = ["name", "style", "gigs"] as const

export default function SortableData() {
  const [bassists, setBassists] = createSignal([
    { gigs: 31, name: "Holly Humbucker", style: "Rock" },
    { gigs: 18, name: "Ines Hertz", style: "Jazz" },
    { gigs: 42, name: "Lou Headstock", style: "Funk" },
    { gigs: 7, name: "Percy Groove", style: "Funk" },
    { gigs: 25, name: "Rory Rootnote", style: "Jazz" },
    { gigs: 12, name: "Stella Nut", style: "Rock" },
  ])

  return (
    <SortableTable
      id="table-sortable-data-1"
      onSort={(event) => {
        event.preventDefault()
        const key = keys[event.detail.column]
        if (!key) return
        const sign = event.detail.direction === "descending" ? -1 : 1
        setBassists((current) =>
          current.toSorted(
            (a, b) =>
              sign *
              String(a[key]).localeCompare(String(b[key]), undefined, {
                numeric: true,
              }),
          ),
        )
      }}
    >
      <Table>
        <TableCaption>Gigs this month</TableCaption>
        <TableHead>
          <TableRow>
            <TableHeaderCell aria-sort="ascending" sortable>
              Name
            </TableHeaderCell>
            <TableHeaderCell sortable>Style</TableHeaderCell>
            <TableHeaderCell numeric sortable>
              Gigs
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <For each={bassists()}>
            {(bassist) => (
              <TableRow>
                <TableCell>{bassist.name}</TableCell>
                <TableCell>{bassist.style}</TableCell>
                <TableCell numeric>{bassist.gigs}</TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </SortableTable>
  )
}
