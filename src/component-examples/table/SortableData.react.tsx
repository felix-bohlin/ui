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

const keys = ["name", "team", "reviews"] as const

export default function SortableData() {
  const [reviewers, setReviewers] = useState([
    { name: "Hakki Hälinen", reviews: 31, team: "Platform" },
    { name: "Inga Halonen", reviews: 18, team: "Design" },
    { name: "Lena Handén", reviews: 42, team: "Platform" },
    { name: "Pekka Gåpåbottanen", reviews: 7, team: "Support" },
    { name: "Ranta Runtiringen", reviews: 25, team: "Design" },
    { name: "Sirkka Nitti", reviews: 12, team: "Support" },
  ])

  return (
    <SortableTable
      id="table-sortable-data-1"
      onSort={(event) => {
        event.preventDefault()
        const key = keys[event.detail.column]
        const sign = event.detail.direction === "descending" ? -1 : 1
        setReviewers((current) =>
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
        <TableCaption>Code reviews this month</TableCaption>
        <TableHead>
          <TableRow>
            <TableHeaderCell aria-sort="ascending" sortable>
              Name
            </TableHeaderCell>
            <TableHeaderCell sortable>Team</TableHeaderCell>
            <TableHeaderCell numeric sortable>
              Reviews
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviewers.map(({ name, reviews, team }) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{team}</TableCell>
              <TableCell numeric>{reviews}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SortableTable>
  )
}
