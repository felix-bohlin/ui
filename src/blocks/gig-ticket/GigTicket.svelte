<script lang="ts">
  import {
    Button,
    Callout,
    CalloutContent,
    CalloutIcon,
    Card,
    CardActions,
    CardContent,
    Chip,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Field,
    Form,
    List,
    ListItem,
    Timeline,
    TimelineItem,
  } from "opui-css/svelte"
</script>

<div
  class="gig-ticket ui-layout-container ui-layout-column ui-gap-large"
  style="--_max-inline-size: 64rem"
>
  <div class="ui-layout-row ui-spread">
    <hgroup class="ui-hgroup">
      <p>Order BB-20417, 2 tickets</p>
      <h1 class="ui-h3">Your tickets</h1>
    </hgroup>
    <div class="ui-layout-row ui-gap-small">
      <Button size="small" type="button" variant="outlined">
        <svg
          data-icon="calendar"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 16H5V10h14z"
          ></path>
        </svg>
        <span class="ui-text">Add to calendar</span>
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
          <path
            fill="currentColor"
            d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1M5 19a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
          ></path>
        </svg>
        <span class="ui-text">Download PDF</span>
      </Button>
    </div>
  </div>
  <Card
    aria-labelledby="gig-ticket-title"
    as="article"
    class="gt-ticket"
    variant="outlined"
  >
    <div class="gt-main">
      <hgroup class="ui-hgroup">
        <p class="ui-overline">Bassbook presents</p>
        <h2 class="gt-title" id="gig-ticket-title">Bassquake Festival 2027</h2>
        <p>The Flatwounds, Drop D Dynasty and Sub Club</p>
      </hgroup>
      <dl class="gt-details">
        <div>
          <dt>Date</dt>
          <dd><time datetime="2027-06-12">Saturday 12 June 2027</time></dd>
        </div>
        <div>
          <dt>Doors</dt>
          <dd><time datetime="2027-06-12T17:00">17:00</time></dd>
        </div>
        <div>
          <dt>Venue</dt>
          <dd>Harbour Stage, Gothenburg</dd>
        </div>
        <div>
          <dt>Entrance</dt>
          <dd>Gate B</dd>
        </div>
      </dl>
    </div>
    <div class="gt-stub">
      <div class="ui-layout-column ui-gap-x-small">
        <span class="gt-admit">Admit one</span>
        <span class="ui-caption">Standing, front of stage</span>
      </div>
      <div
        aria-label="Ticket barcode for BB-20417-01"
        class="gt-code"
        role="img"
      ></div>
      <span class="ui-caption ui-tabular-nums">BB-20417-01</span>
    </div>
  </Card>
  <div class="ui-layout-columns ui-gap-large" style="--_columns: 3fr 2fr">
    <Card
      aria-labelledby="gig-ticket-running-order-heading"
      as="section"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="gig-ticket-running-order-heading">
          Running order
        </h2>
        <p>Times can slide if a bass solo runs long.</p>
      </hgroup>
      <CardContent>
        <Timeline size="small">
          <TimelineItem
            datetime="2027-06-12T17:00"
            label="Doors open"
            time="17:00"
          >
            <p>Merch tent and the free earplug stand open too.</p>
          </TimelineItem>
          <TimelineItem
            datetime="2027-06-12T18:30"
            label="Sub Club"
            time="18:30"
          >
            <p>Five-string dub from Malmö. Bring your chest cavity.</p>
          </TimelineItem>
          <TimelineItem
            datetime="2027-06-12T20:00"
            label="Drop D Dynasty"
            time="20:00"
          >
            <p>Every song is in drop D. Every single one.</p>
          </TimelineItem>
          <TimelineItem
            datetime="2027-06-12T22:00"
            label="The Flatwounds"
            time="22:00"
          >
            <p>Headliners, with a full horn section and one very tall amp.</p>
          </TimelineItem>
          <TimelineItem datetime="2027-06-12T23:45" label="Curfew" time="23:45">
            <p>The harbour has neighbours. They have opinions.</p>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
    <div class="ui-layout-column ui-gap-large">
      <Card
        aria-labelledby="gig-ticket-holders-heading"
        as="section"
        variant="outlined"
      >
        <hgroup>
          <h2 class="ui-h5" id="gig-ticket-holders-heading">
            Tickets in this order
          </h2>
          <p>Each ticket gets its own barcode.</p>
        </hgroup>
        <List bordered variant="transparent">
          <ListItem description="BB-20417-01" label="Percy Groove">
            {#snippet end()}
              <Chip as="span" label="Yours" severity="info" size="small" />
            {/snippet}
          </ListItem>
          <ListItem description="BB-20417-02" label="Holly Humbucker">
            {#snippet end()}
              <Chip
                as="span"
                dot
                label="Sent"
                severity="success"
                size="small"
              />
            {/snippet}
          </ListItem>
        </List>
        <CardActions>
          <Button
            command="show-modal"
            commandfor="gig-ticket-transfer"
            type="button"
            variant="outlined"
          >
            Send a ticket to a friend
          </Button>
        </CardActions>
      </Card>
      <Callout severity="info">
        <CalloutIcon />
        <CalloutContent>
          <h2>Know before you go</h2>
          <p>
            No bags bigger than a bass case. Fine, no bass cases either. Lockers
            by Gate B cost €5 for the night.
          </p>
        </CalloutContent>
      </Callout>
    </div>
  </div>
  <Dialog closedby="any" id="gig-ticket-transfer">
    <DialogHeader>
      <DialogTitle>Send a ticket</DialogTitle>
      <p>They'll get their own barcode and yours stops working.</p>
    </DialogHeader>
    <DialogContent>
      <Form action="#" id="gig-ticket-transfer-form" method="dialog">
        <Field for="gig-ticket-friend-email" label="Friend's email">
          <input
            autocomplete="email"
            id="gig-ticket-friend-email"
            name="friend-email"
            placeholder="friend@bassmail.example"
            required
            type="email"
          />
        </Field>
      </Form>
    </DialogContent>
    <DialogFooter>
      <Button command="close" commandfor="gig-ticket-transfer" type="button">
        Cancel
      </Button>
      <Button form="gig-ticket-transfer-form" type="submit" variant="filled">
        Send ticket
      </Button>
    </DialogFooter>
  </Dialog>
</div>

<style>
  :global {
    .gig-ticket {
      container-type: inline-size;

      .gt-ticket {
        --_notch: var(--ui-space-4);

        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        overflow: hidden;
        padding: 0;
      }

      .gt-main {
        background-image: linear-gradient(
          135deg,
          oklch(from var(--ui-primary) l c h / 18%),
          transparent 60%
        );
        display: grid;
        gap: var(--ui-space-5);
        padding: var(--ui-space-6);
      }

      .gt-title {
        color: var(--ui-text-strong);
        font-size: var(--ui-font-size-800);
        letter-spacing: var(--ui-letter-spacing-display);
        line-height: var(--ui-line-height-tight);
        text-transform: uppercase;
      }

      .gt-details {
        display: grid;
        gap: var(--ui-space-4) var(--ui-space-6);
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
        margin: 0;
        max-inline-size: 30rem;

        dt {
          color: var(--ui-text-subtle);
          font-size: var(--ui-font-size-caption);
          letter-spacing: var(--ui-letter-spacing-caps);
          text-transform: uppercase;
        }

        dd {
          color: var(--ui-text-strong);
          font-weight: var(--ui-font-weight-semibold);
          margin: 0;
        }
      }

      .gt-stub {
        align-content: space-between;
        border-inline-start: var(--ui-border-width-large) dashed
          var(--ui-border-color);
        display: grid;
        gap: var(--ui-space-4);
        justify-items: center;
        padding: var(--ui-space-6);
        position: relative;
        text-align: center;

        &::before,
        &::after {
          background-color: var(--ui-surface);
          block-size: var(--_notch);
          border: var(--ui-border-width) solid var(--ui-border-color);
          border-radius: var(--ui-radius-round);
          content: "";
          inline-size: var(--_notch);
          inset-inline-start: calc(var(--_notch) / -2);
          position: absolute;
        }

        &::before {
          inset-block-start: calc(var(--_notch) / -2);
        }

        &::after {
          inset-block-end: calc(var(--_notch) / -2);
        }
      }

      .gt-code {
        background-image: repeating-linear-gradient(
          90deg,
          currentColor 0 2px,
          transparent 2px 4px,
          currentColor 4px 7px,
          transparent 7px 8px,
          currentColor 8px 9px,
          transparent 9px 12px,
          currentColor 12px 13px,
          transparent 13px 15px
        );
        block-size: 4.5rem;
        inline-size: 9rem;
      }

      .gt-admit {
        font-size: var(--ui-font-size-600);
        font-weight: var(--ui-font-weight-bold);
        letter-spacing: var(--ui-letter-spacing-caps);
        text-transform: uppercase;
      }

      @container (inline-size < 36rem) {
        .gt-ticket {
          grid-template-columns: minmax(0, 1fr);
        }

        .gt-stub {
          border-block-start: var(--ui-border-width-large) dashed
            var(--ui-border-color);
          border-inline-start: 0;

          &::before,
          &::after {
            inset-block-start: calc(var(--_notch) / -2);
          }

          &::before {
            inset-inline-start: calc(var(--_notch) / -2);
          }

          &::after {
            inset-block-end: auto;
            inset-inline-end: calc(var(--_notch) / -2);
            inset-inline-start: auto;
          }
        }
      }
    }
  }
</style>
