<script setup lang="ts">
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Field,
  Progress,
  SelectButton,
  Stat,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/vue"
</script>

<template>
  <div
    class="sales-dashboard ui-layout-container ui-layout-column ui-gap-large"
    style="--_max-inline-size: 80rem"
  >
    <div class="ui-layout-row ui-spread">
      <hgroup class="ui-hgroup">
        <p>Bassbook Shop, updated 8 October, 14:05</p>
        <h1 class="ui-h3">Merch sales</h1>
      </hgroup>
      <div class="ui-layout-row ui-gap-small sales-actions">
        <Field
          for="sales-dashboard-sales-dashboard-period"
          label="Period"
          size="small"
        >
          <select
            id="sales-dashboard-sales-dashboard-period"
            name="sales-dashboard-period"
          >
            <SelectButton />
            <option selected>Year to date</option>
            <option>Last 90 days</option>
            <option>Last 12 months</option>
          </select>
        </Field>
        <Button size="small" type="button" variant="outlined">
          <svg
            data-icon="download"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1M5 19a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
            ></path></svg
          ><span class="ui-text">Export</span>
        </Button>
      </div>
    </div>
    <ul class="ui-layout-grid ui-stretch" style="--_min-inline-size: 13rem">
      <li>
        <Card variant="outlined">
          <CardContent>
            <Stat label="Revenue">
              880 830 kr
              <template #description>
                <span class="ui-caption ui-success">+14.2%</span> from last year
              </template>
            </Stat>
          </CardContent>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <Stat label="Orders">
              2 482
              <template #description>
                <span class="ui-caption ui-success">+6.8%</span> from last year
              </template>
            </Stat>
          </CardContent>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <Stat label="Average order value">
              355 kr
              <template #description>
                <span class="ui-caption ui-critical">−1.9%</span> from last year
              </template>
            </Stat>
          </CardContent>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <Stat label="Conversion rate">
              3.4%
              <template #description>
                <span class="ui-caption ui-success">+0.3 pp</span> from last
                year
              </template>
            </Stat>
          </CardContent>
        </Card>
      </li>
    </ul>
    <div class="ui-layout-columns ui-gap-large" style="--_columns: 2fr 1fr">
      <Card
        aria-labelledby="sales-dashboard-revenue-heading"
        as="section"
        class="sales-chart-card"
        variant="outlined"
      >
        <hgroup>
          <h2 class="ui-h5" id="sales-dashboard-revenue-heading">
            Monthly merch money
          </h2>
          <p>Against our totally rad goal of 100 000 kr a month.</p>
        </hgroup>
        <CardContent>
          <ul aria-hidden="true" class="ui-layout-row ui-caption">
            <li class="ui-layout-row ui-gap-x-small">
              <span class="ui-swatch sales-revenue"></span>Revenue
            </li>
            <li class="ui-layout-row ui-gap-x-small">
              <span class="sales-target-line"></span>Target
            </li>
          </ul>
          <ol class="sales-chart" style="--target: 77%">
            <li>
              <span class="sales-bar" style="--value: 58%"></span>
              <span class="sales-month ui-caption"
                ><span aria-hidden="true">Jan</span
                ><span class="ui-sr-only">January: 75 200 kr</span></span
              >
            </li>
            <li>
              <span class="sales-bar" style="--value: 55%"></span>
              <span class="sales-month ui-caption"
                ><span aria-hidden="true">Feb</span
                ><span class="ui-sr-only">February: 71 540 kr</span></span
              >
            </li>
            <li>
              <span class="sales-bar" style="--value: 66%"></span>
              <span class="sales-month ui-caption"
                ><span aria-hidden="true">Mar</span
                ><span class="ui-sr-only">March: 86 190 kr</span></span
              >
            </li>
            <li>
              <span class="sales-bar" style="--value: 71%"></span>
              <span class="sales-month ui-caption"
                ><span aria-hidden="true">Apr</span
                ><span class="ui-sr-only">April: 92 430 kr</span></span
              >
            </li>
            <li>
              <span class="sales-bar" style="--value: 80%"></span>
              <span class="sales-month ui-caption"
                ><span aria-hidden="true">May</span
                ><span class="ui-sr-only">May: 104 180 kr</span></span
              >
            </li>
            <li>
              <span class="sales-bar" style="--value: 74%"></span>
              <span class="sales-month ui-caption"
                ><span aria-hidden="true">Jun</span
                ><span class="ui-sr-only">June: 96 320 kr</span></span
              >
            </li>
            <li>
              <span class="sales-bar" style="--value: 62%"></span>
              <span class="sales-month ui-caption"
                ><span aria-hidden="true">Jul</span
                ><span class="ui-sr-only">July: 80 650 kr</span></span
              >
            </li>
            <li>
              <span class="sales-bar" style="--value: 84%"></span>
              <span class="sales-month ui-caption"
                ><span aria-hidden="true">Aug</span
                ><span class="ui-sr-only">August: 109 270 kr</span></span
              >
            </li>
            <li>
              <span class="sales-bar" style="--value: 93%"></span>
              <span class="sales-month ui-caption"
                ><span aria-hidden="true">Sep</span
                ><span class="ui-sr-only">September: 120 840 kr</span></span
              >
            </li>
            <li class="sales-current">
              <span class="sales-bar" style="--value: 34%"></span>
              <span class="sales-month ui-caption"
                ><span aria-hidden="true">Oct</span
                ><span class="ui-sr-only">October so far: 44 210 kr</span></span
              >
            </li>
          </ol></CardContent
        >
      </Card>
      <Card
        aria-labelledby="sales-dashboard-targets-heading"
        as="section"
        variant="outlined"
      >
        <hgroup>
          <h2 class="ui-h5" id="sales-dashboard-targets-heading">
            October targets
          </h2>
          <p>Month to date, by where the merch flew off to.</p>
        </hgroup>
        <CardContent>
          <ul class="ui-layout-column">
            <li class="ui-layout-column ui-gap-x-small">
              <div
                class="ui-layout-row ui-gap-small ui-tabular-nums sales-target"
                id="sales-dashboard-target-shop"
              >
                <span>Online shop</span
                ><span class="ui-caption">24.8k of 52k kr</span>
              </div>
              <Progress
                aria-labelledby="sales-dashboard-target-shop"
                :max="520"
                :value="248"
              />
            </li>
            <li class="ui-layout-column ui-gap-x-small">
              <div
                class="ui-layout-row ui-gap-small ui-tabular-nums sales-target"
                id="sales-dashboard-target-gigs"
              >
                <span>Merch table at gigs</span
                ><span class="ui-caption">11.2k of 33k kr</span>
              </div>
              <Progress
                aria-labelledby="sales-dashboard-target-gigs"
                :max="330"
                :value="112"
              />
            </li>
            <li class="ui-layout-column ui-gap-x-small">
              <div
                class="ui-layout-row ui-gap-small ui-tabular-nums sales-target"
                id="sales-dashboard-target-bass-shops"
              >
                <span>Bass shops</span
                ><span class="ui-caption">6.4k of 10k kr</span>
              </div>
              <Progress
                aria-labelledby="sales-dashboard-target-bass-shops"
                :max="100"
                :value="64"
              />
            </li>
            <li class="ui-layout-column ui-gap-x-small">
              <div
                class="ui-layout-row ui-gap-small ui-tabular-nums sales-target"
                id="sales-dashboard-target-bundles"
              >
                <span>Band bundles</span
                ><span class="ui-caption">1.8k of 5k kr</span>
              </div>
              <Progress
                aria-labelledby="sales-dashboard-target-bundles"
                :max="50"
                :value="18"
              />
            </li>
          </ul>
        </CardContent>
        <CardActions>
          <Button href="#sales-dashboard-targets" size="small"
            >Edit targets</Button
          >
        </CardActions>
      </Card>
    </div>
    <Card
      aria-labelledby="sales-dashboard-orders-heading"
      as="section"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="sales-dashboard-orders-heading">Latest orders</h2>
      </hgroup>
      <CardContent>
        <Table
          aria-labelledby="sales-dashboard-orders-heading"
          density="dense"
          flush
          overflow="scroll"
          :tabindex="0"
        >
          <TableHead>
            <TableRow>
              <TableHeaderCell scope="col">Order</TableHeaderCell>
              <TableHeaderCell scope="col">Customer</TableHeaderCell>
              <TableHeaderCell scope="col">Date</TableHeaderCell>
              <TableHeaderCell scope="col">Status</TableHeaderCell>
              <TableHeaderCell numeric scope="col">Total</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <a class="ui-link" href="#sales-dashboard-order-2482">#2482</a>
              </TableCell>
              <TableCell>Kinga Headstock</TableCell>
              <TableCell>8 Oct, 13:58</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Being packed"
                  severity="info"
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell numeric>1 249 kr</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <a class="ui-link" href="#sales-dashboard-order-2481">#2481</a>
              </TableCell>
              <TableCell>Fretless Tal's Bass Barn</TableCell>
              <TableCell>8 Oct, 13:41</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Paid"
                  severity="success"
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell numeric>12 880 kr</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <a class="ui-link" href="#sales-dashboard-order-2480">#2480</a>
              </TableCell>
              <TableCell>Scott Humbucker</TableCell>
              <TableCell>8 Oct, 13:12</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Paid"
                  severity="success"
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell numeric>389 kr</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <a class="ui-link" href="#sales-dashboard-order-2479">#2479</a>
              </TableCell>
              <TableCell>Mohini Hertz</TableCell>
              <TableCell>8 Oct, 12:47</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Awaiting payment"
                  severity="warning"
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell numeric>2 095 kr</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <a class="ui-link" href="#sales-dashboard-order-2478">#2478</a>
              </TableCell>
              <TableCell>Adam Groove</TableCell>
              <TableCell>8 Oct, 12:30</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Refunded"
                  severity="critical"
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell numeric>−649 kr</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions>
        <Button href="#sales-dashboard-orders" size="small"
          >View all orders</Button
        >
      </CardActions>
    </Card>
  </div>
</template>

<style>
.sales-dashboard {
  container-type: inline-size;

  .sales-actions {
    align-items: end;
  }

  .sales-revenue {
    --_swatch-bg-color: var(--ui-primary);
  }

  .sales-target-line {
    border-block-start: var(--ui-border-width-large) dashed var(--ui-text);
    inline-size: var(--ui-space-4);
  }

  .sales-chart-card .ui-content {
    padding-block-end: var(--ui-space-7);
  }

  .sales-chart {
    align-items: end;
    block-size: 12rem;
    border-block-end: var(--ui-border-width) solid var(--ui-border-color);
    display: grid;
    gap: var(--ui-space-1);
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    list-style-type: none;
    padding: 0;
    position: relative;

    &::before {
      border-block-start: var(--ui-border-width-large) dashed var(--ui-text);
      content: "";
      inset-block-end: var(--target);
      inset-inline: 0;
      position: absolute;
    }

    li {
      align-items: center;
      block-size: 100%;
      display: grid;
      grid-template-rows: 1fr auto;
      justify-items: center;
      row-gap: var(--ui-space-1);
    }

    .sales-bar {
      align-self: end;
      background-color: var(--ui-primary);
      block-size: var(--value);
      border-start-end-radius: var(--ui-radius-small);
      border-start-start-radius: var(--ui-radius-small);
      inline-size: min(100%, 2.5rem);
    }

    .sales-current .sales-bar {
      opacity: 0.5;
    }

    .sales-month {
      translate: 0 calc(100% + var(--ui-space-1));
    }
  }

  .sales-target span:last-child {
    margin-inline-start: auto;
  }
}
</style>
