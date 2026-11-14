"use client"

import { useState } from "react"
import {
  SortableTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

const keys = ["name", "style", "gigs"] as const

export default function SortableData() {
  const [bassists, setBassists] = useState([
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
          {bassists.map(({ gigs, name, style }) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{style}</TableCell>
              <TableCell numeric>{gigs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SortableTable>
  )
}
