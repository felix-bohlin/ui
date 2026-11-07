<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableColumn,
    TableColumnGroup,
    TableFoot,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table>
  <TableCaption>Nordic Countries Overview</TableCaption>
  <TableColumnGroup>
    <TableColumn width="8rem" />
    <TableColumn span={3} />
    <TableColumn span={2} />
  </TableColumnGroup>
  <TableHead>
    <TableRow>
      <TableHeaderCell rowspan={2} scope="col">Country</TableHeaderCell>
      <TableHeaderCell colspan={3} scope="colgroup"
        >Major Cities</TableHeaderCell
      >
      <TableHeaderCell colspan={2} scope="colgroup">Nature</TableHeaderCell>
    </TableRow>
    <TableRow>
      <TableHeaderCell scope="col">Capital</TableHeaderCell>
      <TableHeaderCell scope="col">2nd Largest</TableHeaderCell>
      <TableHeaderCell scope="col">3rd Largest</TableHeaderCell>
      <TableHeaderCell scope="col">National Animal</TableHeaderCell>
      <TableHeaderCell scope="col">National Bird</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableHeaderCell scope="row">Denmark</TableHeaderCell>
      <TableCell>København</TableCell>
      <TableCell>Aarhus</TableCell>
      <TableCell>Odense</TableCell>
      <TableCell>Mute Swan</TableCell>
      <TableCell>Mute Swan</TableCell>
    </TableRow>
    <TableRow>
      <TableHeaderCell scope="row">Finland</TableHeaderCell>
      <TableCell>Helsinki</TableCell>
      <TableCell>Espoo</TableCell>
      <TableCell>Tampere</TableCell>
      <TableCell>Brown Bear</TableCell>
      <TableCell>Whooper Swan</TableCell>
    </TableRow>
    <TableRow>
      <TableHeaderCell scope="row">Iceland</TableHeaderCell>
      <TableCell>Reykjavík</TableCell>
      <TableCell>Kópavogur</TableCell>
      <TableCell>Hafnarfjörður</TableCell>
      <TableCell>Gyrfalcon</TableCell>
      <TableCell>Gyrfalcon</TableCell>
    </TableRow>
    <TableRow>
      <TableHeaderCell scope="row">Norway</TableHeaderCell>
      <TableCell>Oslo</TableCell>
      <TableCell>Bergen</TableCell>
      <TableCell>Trondheim</TableCell>
      <TableCell>Elk</TableCell>
      <TableCell>White-throated Dipper</TableCell>
    </TableRow>
    <TableRow>
      <TableHeaderCell scope="row">Sweden</TableHeaderCell>
      <TableCell>Stockholm</TableCell>
      <TableCell>Göteborg</TableCell>
      <TableCell>Malmö</TableCell>
      <TableCell>Elk</TableCell>
      <TableCell>Common Blackbird</TableCell>
    </TableRow>
  </TableBody>
  <TableFoot>
    <TableRow>
      <TableCell colspan={6}>5 countries</TableCell>
    </TableRow>
  </TableFoot>
</Table>
