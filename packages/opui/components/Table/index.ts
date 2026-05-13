import Table from "./Table.astro"
import Head from "./Head.astro"
import Body from "./Body.astro"
import Row from "./Row.astro"
import HeaderCell from "./HeaderCell.astro"
import Cell from "./Cell.astro"
import Column from "./Column.astro"
import ColumnGroup from "./ColumnGroup.astro"

export { Head, Body, Row, HeaderCell, Cell, Column, ColumnGroup }

export default Object.assign(Table, {
  Head,
  Body,
  Row,
  HeaderCell,
  Cell,
  Column,
  ColumnGroup,
})
