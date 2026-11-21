<script setup lang="ts">
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
} from "opui-css/vue"
</script>

<template>
  <Table>
    <TableCaption>Nordic countries</TableCaption>
    <TableColumnGroup>
      <TableColumn width="8rem" />
      <TableColumn :span="3" />
      <TableColumn :span="2" />
    </TableColumnGroup>
    <TableHead>
      <TableRow>
        <TableHeaderCell :rowspan="2" scope="col">Country</TableHeaderCell>
        <TableHeaderCell :colspan="3" scope="colgroup"
          >Major cities</TableHeaderCell
        >
        <TableHeaderCell :colspan="2" scope="colgroup">Nature</TableHeaderCell>
      </TableRow>
      <TableRow>
        <TableHeaderCell scope="col">Capital</TableHeaderCell>
        <TableHeaderCell scope="col">2nd largest</TableHeaderCell>
        <TableHeaderCell scope="col">3rd largest</TableHeaderCell>
        <TableHeaderCell scope="col">National animal</TableHeaderCell>
        <TableHeaderCell scope="col">National bird</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableHeaderCell scope="row">Denmark</TableHeaderCell>
        <TableCell>København</TableCell>
        <TableCell>Aarhus</TableCell>
        <TableCell>Odense</TableCell>
        <TableCell>Mute swan</TableCell>
        <TableCell>Mute swan</TableCell>
      </TableRow>
      <TableRow>
        <TableHeaderCell scope="row">Finland</TableHeaderCell>
        <TableCell>Helsinki</TableCell>
        <TableCell>Espoo</TableCell>
        <TableCell>Tampere</TableCell>
        <TableCell>Brown bear</TableCell>
        <TableCell>Whooper swan</TableCell>
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
        <TableCell>White-throated dipper</TableCell>
      </TableRow>
      <TableRow>
        <TableHeaderCell scope="row">Sweden</TableHeaderCell>
        <TableCell>Stockholm</TableCell>
        <TableCell>Göteborg</TableCell>
        <TableCell>Malmö</TableCell>
        <TableCell>Elk</TableCell>
        <TableCell>Common blackbird</TableCell>
      </TableRow>
    </TableBody>
    <TableFoot>
      <TableRow>
        <TableCell :colspan="6">5 countries</TableCell>
      </TableRow>
    </TableFoot>
  </Table>
</template>
