<script lang="ts">
  import {
    Button,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"

  const orders = [
    {
      customer: "Lena Ek",
      details: "Two items, shipped to Göteborg on 3 March.",
      id: "1042",
      total: "€84.00",
    },
    {
      customer: "Tom Tanaka",
      details: "Three items, waiting for the last one to come in stock.",
      id: "1043",
      total: "€126.50",
    },
    {
      customer: "Elif Rahman",
      details: "One item, delivered on 5 March.",
      id: "1044",
      total: "€39.90",
    },
  ]

  let expanded: string[] = $state([])

  function toggle(id: string) {
    expanded = expanded.includes(id)
      ? expanded.filter((item) => item !== id)
      : [...expanded, id]
  }
</script>

<Table id="table-expandable-1">
  <TableCaption>Orders</TableCaption>
  <TableHead>
    <TableRow>
      <TableHeaderCell><span class="ui-sr-only">Details</span></TableHeaderCell>
      <TableHeaderCell>Order</TableHeaderCell>
      <TableHeaderCell>Customer</TableHeaderCell>
      <TableHeaderCell numeric>Total</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {#each orders as order, index (order.id)}
      <TableRow>
        <TableCell>
          <Button
            aria-controls={`table-expandable-${index + 1}-details`}
            aria-expanded={expanded.includes(order.id)}
            aria-label={`Details of order ${order.id}`}
            class="table-expand"
            onclick={() => toggle(order.id)}
            round
            size="small"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M5.366 11.116a1.25 1.25 0 0 1 1.768 0L16 19.982l8.866-8.866a1.25 1.25 0 0 1 1.768 1.768l-9.75 9.75a1.25 1.25 0 0 1-1.768 0l-9.75-9.75a1.25 1.25 0 0 1 0-1.768"
              ></path>
            </svg>
          </Button>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.customer}</TableCell>
        <TableCell numeric>{order.total}</TableCell>
      </TableRow>
      <TableRow
        hidden={!expanded.includes(order.id)}
        id={`table-expandable-${index + 1}-details`}
      >
        <TableCell colspan={4}>{order.details}</TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>

<style>
  :global {
    .table-expand[aria-expanded="true"] > svg {
      rotate: 180deg;
    }
  }
</style>
