import { Table } from "opui-css/solid"

export default function Example() {
  return (
    <Table spacious>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row><Table.Cell>Row 1</Table.Cell><Table.Cell>Value 1</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Row 2</Table.Cell><Table.Cell>Value 2</Table.Cell></Table.Row>
      </Table.Body>
    </Table>
  )
}
