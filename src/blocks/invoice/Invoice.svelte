<script lang="ts">
  import {
    Button,
    Callout,
    CalloutContent,
    CalloutIcon,
    Card,
    CardContent,
    Chip,
    DescriptionList,
    DescriptionListDescription,
    DescriptionListItem,
    DescriptionListTerm,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<div
  class="invoice ui-layout-container ui-layout-column ui-gap-large"
  style="--_max-inline-size: 58rem"
>
  <div class="ui-layout-row ui-gap-small ui-spread invoice-toolbar">
    <Button href="#invoice-all" size="small"
      ><svg
        data-icon="chevron-left"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
        ></path>
      </svg><span class="ui-text">All invoices</span></Button
    >
    <div class="ui-layout-row ui-gap-small">
      <Button size="small" type="button" variant="outlined">
        <svg
          data-icon="print"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3m-3 11H8v-5h8zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-1-9H6v4h12z"
          ></path>
        </svg><span class="ui-text">Print</span>
      </Button>
      <Button size="small" type="button" variant="outlined">
        <svg
          data-icon="download"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"
          ></path>
        </svg><span class="ui-text">PDF</span>
      </Button>
      <Button size="small" type="button" variant="filled">
        <svg
          data-icon="send"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"
          ></path>
        </svg><span class="ui-text">Send invoice</span>
      </Button>
    </div>
  </div>
  <Card
    aria-labelledby="invoice-heading"
    as="article"
    class="invoice-sheet"
    variant="outlined"
  >
    <CardContent>
      <div class="ui-layout-row ui-spread invoice-head">
        <div class="ui-layout-row ui-gap-small invoice-brand">
          <svg
            data-icon="layers"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27z"
            ></path>
          </svg>
          Bassbook
        </div>
        <div class="ui-layout-column ui-gap-small invoice-title">
          <hgroup>
            <h1 class="ui-h3" id="invoice-heading">Invoice BB-2026-0418</h1>
            <p>Issued 8 October 2026</p>
          </hgroup>
          <Chip
            as="span"
            dot
            label="Due 7 November 2026"
            severity="warning"
            size="small"
          />
        </div>
      </div>
      <div
        class="ui-layout-grid ui-gap-large ui-stretch invoice-parties"
        style="--_min-inline-size: 12rem"
      >
        <section aria-labelledby="invoice-from">
          <h2 class="ui-overline invoice-label" id="invoice-from">From</h2>
          <address>
            <strong>Bassbook HQ</strong><br /> 4 Fretboard Lane<br /> 444 44
            Bassville<br /> VAT EX444444444401
          </address>
        </section>
        <section aria-labelledby="invoice-to">
          <h2 class="ui-overline invoice-label" id="invoice-to">Bill to</h2>
          <address>
            <strong>Slap Like Now</strong><br /> Attn. Adam Groove<br />
            Rehearsal Room B, 7 Drop D Drive<br /> 411 36 Rumbleton
          </address>
        </section>
        <section aria-labelledby="invoice-details">
          <h2 class="ui-overline invoice-label" id="invoice-details">
            Details
          </h2>
          <DescriptionList>
            <DescriptionListItem>
              <DescriptionListTerm>Your reference</DescriptionListTerm>
              <DescriptionListDescription
                >BAND-FUND-04</DescriptionListDescription
              >
            </DescriptionListItem>
            <DescriptionListItem>
              <DescriptionListTerm>Payment terms</DescriptionListTerm>
              <DescriptionListDescription
                >30 days, no excuses</DescriptionListDescription
              >
            </DescriptionListItem>
          </DescriptionList>
        </section>
      </div>
      <Table
        aria-label="Line items"
        class="invoice-items"
        flush
        overflow="scroll"
        tabindex={0}
      >
        <TableHead>
          <TableRow>
            <TableHeaderCell scope="col">Description</TableHeaderCell>
            <TableHeaderCell numeric scope="col">Qty</TableHeaderCell>
            <TableHeaderCell numeric scope="col">Unit price</TableHeaderCell>
            <TableHeaderCell numeric scope="col">Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              Bassbook Gold, yearly
              <p class="ui-caption">4 band members, Nov 2026 to Oct 2027</p>
            </TableCell>
            <TableCell numeric>4</TableCell>
            <TableCell numeric>€30.00</TableCell>
            <TableCell numeric>€120.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Bassbook Platinum, yearly
              <p class="ui-caption">For the bassist, obviously</p>
            </TableCell>
            <TableCell numeric>1</TableCell>
            <TableCell numeric>€50.00</TableCell>
            <TableCell numeric>€50.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Gig flyer boost
              <p class="ui-caption">Pinned on the Bassists Anonymous wall</p>
            </TableCell>
            <TableCell numeric>2</TableCell>
            <TableCell numeric>€4.50</TableCell>
            <TableCell numeric>€9.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Profile glitter pack, October 2026
              <p class="ui-caption">Extra sparkles for the band page</p>
            </TableCell>
            <TableCell numeric>1</TableCell>
            <TableCell numeric>€1.00</TableCell>
            <TableCell numeric>€1.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <DescriptionList
        class="invoice-totals"
        leader="solid"
        orientation="horizontal"
      >
        <DescriptionListItem>
          <DescriptionListTerm>Subtotal</DescriptionListTerm>
          <DescriptionListDescription>€180.00</DescriptionListDescription>
        </DescriptionListItem>
        <DescriptionListItem>
          <DescriptionListTerm>VAT 25 %</DescriptionListTerm>
          <DescriptionListDescription>€45.00</DescriptionListDescription>
        </DescriptionListItem>
        <DescriptionListItem total>
          <DescriptionListTerm>Total due</DescriptionListTerm>
          <DescriptionListDescription>€225.00</DescriptionListDescription>
        </DescriptionListItem>
      </DescriptionList>
      <Divider />
      <section
        aria-labelledby="invoice-payment-heading"
        class="ui-layout-columns ui-gap-large ui-breakpoint-small"
        style="--_columns: 3fr 2fr"
      >
        <div>
          <h2 class="ui-overline invoice-label" id="invoice-payment-heading">
            Payment details
          </h2>
          <DescriptionList leader="solid">
            <DescriptionListItem>
              <DescriptionListTerm>Bankgiro</DescriptionListTerm>
              <DescriptionListDescription>4444-4444</DescriptionListDescription>
            </DescriptionListItem>
            <DescriptionListItem>
              <DescriptionListTerm>IBAN</DescriptionListTerm>
              <DescriptionListDescription
                >EX00 BASS 0000 0000 0444 4444</DescriptionListDescription
              >
            </DescriptionListItem>
            <DescriptionListItem>
              <DescriptionListTerm>BIC</DescriptionListTerm>
              <DescriptionListDescription>BASSEX44</DescriptionListDescription>
            </DescriptionListItem>
            <DescriptionListItem>
              <DescriptionListTerm>OCR reference</DescriptionListTerm>
              <DescriptionListDescription
                >4180 2026 7</DescriptionListDescription
              >
            </DescriptionListItem>
          </DescriptionList>
        </div>
        <Callout severity="info">
          <CalloutIcon />
          <CalloutContent>
            <h3>Pay by 7 November</h3>
            <p>
              Use the OCR reference so we can match your payment, easy peasy!
              Questions? Email <a class="ui-link" href="#invoice-billing"
                >billing@bassbook.example</a
              >.
            </p>
          </CalloutContent>
        </Callout>
      </section>
      <p class="invoice-footer ui-caption">
        Bassbook, Org. no. 444444-4444, registered office Bassville. Thanks for
        keeping it funky! &lt;3
      </p>
    </CardContent>
  </Card>
</div>

<style>
  :global {
    .invoice {
      container-type: inline-size;

      .invoice-sheet {
        padding: var(--ui-space-2);

        @container (inline-size >= 40rem) {
          padding: var(--ui-space-6);
        }

        > .ui-content {
          gap: var(--ui-space-7);
        }
      }

      .invoice-head {
        align-items: start;
      }

      .invoice-brand {
        font-weight: var(--ui-font-weight-bold);

        svg {
          block-size: 1.75rem;
          color: var(--ui-primary);
          inline-size: 1.75rem;
        }
      }

      .invoice-title {
        align-items: start;

        @container (inline-size >= 40rem) {
          align-items: end;
          text-align: end;
        }
      }

      .invoice-parties {
        address {
          font-style: normal;
          line-height: 1.5;
        }
      }

      .invoice-label {
        margin-block-end: var(--ui-space-2);
      }

      .invoice-items :is(th, td) {
        &:first-child {
          inline-size: 100%;
        }

        &:last-child {
          inline-size: auto;
        }
      }

      .invoice-totals {
        justify-self: end;
        max-inline-size: 22rem;
      }

      .invoice-footer {
        text-align: center;
      }

      @media print {
        .invoice-toolbar {
          display: none;
        }

        .invoice-sheet :is(section, .ui-callout) {
          break-inside: avoid;
        }
      }
    }
  }
</style>
