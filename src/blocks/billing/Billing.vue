<script setup lang="ts">
import {
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  Card,
  CardActions,
  CardContent,
  Chip,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
  Progress,
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
    class="billing ui-layout-container ui-layout-column ui-large"
    style="--_max-inline-size: 64rem"
  >
    <hgroup class="ui-hgroup">
      <p>The Low Enders band account</p>
      <h1 class="ui-h3">Billing</h1>
    </hgroup>
    <div class="ui-layout-columns ui-large" style="--_columns: 3fr 2fr">
      <Card
        aria-labelledby="billing-plan-heading"
        as="section"
        variant="outlined"
      >
        <hgroup>
          <p>Current plan</p>
          <h2 class="ui-h5" id="billing-plan-heading">Gold band pack</h2>
        </hgroup>
        <CardContent>
          <p class="billing-plan-price">
            <strong class="ui-tabular-nums">€12</strong
            ><span>per month, 4 members × €3</span>
          </p>
          <div class="ui-layout-row ui-small">
            <Chip as="span" label="Billed monthly" size="small" />
            <Chip as="span" size="small">
              <template #label
                >Renews <time datetime="2026-11-01">1 Nov 2026</time>
              </template>
            </Chip>
          </div>
        </CardContent>
        <CardActions>
          <Button type="button" variant="filled">Change plan</Button>
          <Button type="button" variant="outlined">
            Switch to yearly, 2 months free
          </Button>
        </CardActions>
      </Card>
      <Card
        aria-labelledby="billing-usage-heading"
        as="section"
        variant="outlined"
      >
        <hgroup>
          <h2 class="ui-h5" id="billing-usage-heading">Usage</h2>
          <p>Resets on 1 November. Rock on!</p>
        </hgroup>
        <CardContent>
          <ul class="ui-layout-column">
            <li class="ui-layout-column ui-x-small">
              <span
                class="ui-layout-row ui-spread ui-tabular-nums"
                id="billing-usage-seats"
                ><span>Band members</span><span>4 of 5</span></span
              >
              <Progress
                aria-labelledby="billing-usage-seats"
                :max="5"
                :value="4"
              />
            </li>
            <li class="ui-layout-column ui-x-small">
              <span
                class="ui-layout-row ui-spread ui-tabular-nums"
                id="billing-usage-recordings"
                ><span>Gig recordings</span><span>14.2 of 20 GB</span></span
              >
              <Progress
                aria-labelledby="billing-usage-recordings"
                :max="20"
                :value="14.2"
              />
            </li>
            <li class="ui-layout-column ui-x-small">
              <span
                class="ui-layout-row ui-spread ui-tabular-nums"
                id="billing-usage-songs"
                ><span>Song uploads</span><span>91 of 100</span></span
              >
              <Progress
                aria-labelledby="billing-usage-songs"
                :max="100"
                :value="91"
              />
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
    <Callout severity="warning">
      <CalloutIcon />
      <CalloutContent>
        <p>
          Whoa, you've uploaded 91 of this month's 100 songs! Uploads over the
          limit cost €0.40 per 10 songs.
          <a class="ui-link" href="#billing-limits">Raise the limit</a>
        </p>
      </CalloutContent>
    </Callout>
    <Card
      aria-labelledby="billing-payment-heading"
      as="section"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="billing-payment-heading">Payment details</h2>
      </hgroup>
      <CardContent>
        <div class="ui-layout-media">
          <span aria-hidden="true" class="billing-card-logo">VISA</span>
          <div>
            <p>Visa ending in 4242</p>
            <p>Expires 08 / 2028, Default</p>
          </div>
        </div>
        <DescriptionList>
          <DescriptionListItem>
            <DescriptionListTerm>Billing email</DescriptionListTerm>
            <DescriptionListDescription
              >rory@lowend.example</DescriptionListDescription
            >
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm>Band</DescriptionListTerm>
            <DescriptionListDescription
              >The Low Enders</DescriptionListDescription
            >
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm>VAT number</DescriptionListTerm>
            <DescriptionListDescription
              >EX444444444401</DescriptionListDescription
            >
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm>Address</DescriptionListTerm>
            <DescriptionListDescription
              >Rehearsal Room B, 4 Low End Lane,
              Bassville</DescriptionListDescription
            >
          </DescriptionListItem>
        </DescriptionList>
      </CardContent>
      <CardActions>
        <Button type="button" variant="outlined">Update card</Button>
        <Button type="button">Edit details</Button>
      </CardActions>
    </Card>
    <Card
      aria-labelledby="billing-invoices-heading"
      as="section"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="billing-invoices-heading">Invoices</h2>
      </hgroup>
      <CardContent>
        <Table
          aria-labelledby="billing-invoices-heading"
          flush
          overflow="scroll"
          tabindex="0"
        >
          <TableHead>
            <TableRow>
              <TableHeaderCell scope="col">Date</TableHeaderCell>
              <TableHeaderCell scope="col">Invoice</TableHeaderCell>
              <TableHeaderCell scope="col">Status</TableHeaderCell>
              <TableHeaderCell numeric scope="col">Amount</TableHeaderCell>
              <TableHeaderCell scope="col"
                ><span class="ui-sr-only">Download</span></TableHeaderCell
              >
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                ><time datetime="2026-10-01">1 Oct 2026</time></TableCell
              >
              <TableCell>INV-2026-0010</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Due 15 Oct"
                  severity="warning"
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell numeric>€12.00</TableCell>
              <TableCell>
                <Button
                  aria-label="Download INV-2026-0010"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1M5 19a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
                    ></path>
                  </svg>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                ><time datetime="2026-09-01">1 Sep 2026</time></TableCell
              >
              <TableCell>INV-2026-0009</TableCell>
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
              <TableCell numeric>€12.00</TableCell>
              <TableCell>
                <Button
                  aria-label="Download INV-2026-0009"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1M5 19a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
                    ></path>
                  </svg>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                ><time datetime="2026-08-01">1 Aug 2026</time></TableCell
              >
              <TableCell>INV-2026-0008</TableCell>
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
              <TableCell numeric>€9.00</TableCell>
              <TableCell>
                <Button
                  aria-label="Download INV-2026-0008"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1M5 19a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
                    ></path>
                  </svg>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                ><time datetime="2026-07-01">1 Jul 2026</time></TableCell
              >
              <TableCell>INV-2026-0007</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Refunded"
                  severity="neutral"
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell numeric>€9.00</TableCell>
              <TableCell>
                <Button
                  aria-label="Download INV-2026-0007"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1M5 19a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
                    ></path>
                  </svg>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions>
        <Button href="#billing-all-invoices">View all invoices</Button>
      </CardActions>
    </Card>
  </div>
</template>

<style>
.billing {
  container-type: inline-size;

  .billing-plan-price {
    align-items: baseline;
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-space-1);

    strong {
      font-size: var(--ui-font-size-800);
      line-height: 1;
    }
  }

  .billing-card-logo {
    align-items: center;
    background: linear-gradient(
      135deg,
      var(--ui-primary),
      oklch(from var(--ui-primary) calc(l - 0.15) c calc(h + 40))
    );
    block-size: 2rem;
    border-radius: var(--ui-radius-small);
    color: var(--ui-on-primary);
    display: flex;
    font-size: var(--ui-font-size-caption);
    font-weight: var(--ui-font-weight-bold);
    inline-size: 4rem;
    justify-content: center;
  }
}
</style>
