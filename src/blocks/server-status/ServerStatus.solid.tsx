/** @jsxImportSource @solidjs/web */
import {
  Accordion,
  AccordionContent,
  AccordionSummary,
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
} from "opui-css/solid"

export default function ServerStatus() {
  return (
    <>
      <div
        class="server-status ui-layout-container ui-layout-column ui-gap-large"
        style="--_max-inline-size: 64rem"
      >
        <div class="ui-layout-row ui-spread">
          <hgroup class="ui-hgroup">
            <p>Checked 8 October 2026, 14:12 CEST</p>
            <h1 class="ui-h3">Bassbook status</h1>
          </hgroup>
          <Button
            command="show-modal"
            commandfor="server-status-subscribe"
            size="small"
            type="button"
            variant="outlined"
          >
            Subscribe to updates
          </Button>
        </div>
        <Callout severity="warning">
          <CalloutIcon />
          <CalloutContent>
            <h2>Low frequencies are lagging behind</h2>
            <p>
              Some bass notes on profile songs arrive up to 2 seconds late. Like
              a bassist behind the beat! Everything else is grooving normally.{" "}
              <a class="ui-link" href="#server-status-incident-laggy-bass">
                Follow the incident
              </a>
            </p>
          </CalloutContent>
        </Callout>
        <div class="ui-layout-columns ui-gap-large" style="--_columns: 3fr 2fr">
          <Card
            aria-labelledby="server-status-services-heading"
            as="section"
            variant="outlined"
          >
            <hgroup>
              <h2 class="ui-h5" id="server-status-services-heading">
                Services
              </h2>
              <p>Uptime over the last 30 days.</p>
            </hgroup>
            <List bordered variant="transparent">
              <ListItem
                description="99.99% uptime"
                end={
                  <Chip
                    as="span"
                    dot
                    label="Operational"
                    severity="success"
                    size="small"
                  />
                }
                label="The Wall"
              />
              <ListItem
                description="99.95% uptime"
                end={
                  <Chip
                    as="span"
                    dot
                    label="Operational"
                    severity="success"
                    size="small"
                  />
                }
                label="Photo uploads"
              />
              <ListItem
                description="100% uptime"
                end={
                  <Chip
                    as="span"
                    dot
                    label="Operational"
                    severity="success"
                    size="small"
                  />
                }
                label="Messages"
              />
              <ListItem
                description="99.81% uptime"
                end={
                  <Chip
                    as="span"
                    dot
                    label="Degraded"
                    severity="warning"
                    size="small"
                  />
                }
                label="Low frequencies"
              />
              <ListItem
                description="99.90% uptime"
                end={
                  <Chip
                    as="span"
                    dot
                    label="Operational"
                    severity="success"
                    size="small"
                  />
                }
                label="Friend requests"
              />
            </List>
          </Card>
          <Card
            aria-labelledby="server-status-response-heading"
            as="section"
            class="status-chart-card"
            variant="outlined"
          >
            <hgroup>
              <h2 class="ui-h5" id="server-status-response-heading">
                Response time
              </h2>
              <p>Low frequencies p95 per hour, today.</p>
            </hgroup>
            <CardContent>
              <ol class="status-response">
                <li>
                  <span class="status-bar" style="--value: 22%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">04</span>
                    <span class="ui-sr-only">04:00: 132 ms</span>
                  </span>
                </li>
                <li>
                  <span class="status-bar" style="--value: 20%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">05</span>
                    <span class="ui-sr-only">05:00: 121 ms</span>
                  </span>
                </li>
                <li>
                  <span class="status-bar" style="--value: 24%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">06</span>
                    <span class="ui-sr-only">06:00: 140 ms</span>
                  </span>
                </li>
                <li>
                  <span class="status-bar" style="--value: 30%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">07</span>
                    <span class="ui-sr-only">07:00: 176 ms</span>
                  </span>
                </li>
                <li>
                  <span class="status-bar" style="--value: 34%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">08</span>
                    <span class="ui-sr-only">08:00: 198 ms</span>
                  </span>
                </li>
                <li>
                  <span class="status-bar" style="--value: 32%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">09</span>
                    <span class="ui-sr-only">09:00: 187 ms</span>
                  </span>
                </li>
                <li>
                  <span class="status-bar" style="--value: 35%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">10</span>
                    <span class="ui-sr-only">10:00: 204 ms</span>
                  </span>
                </li>
                <li>
                  <span class="status-bar" style="--value: 33%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">11</span>
                    <span class="ui-sr-only">11:00: 192 ms</span>
                  </span>
                </li>
                <li class="status-slow">
                  <span class="status-bar" style="--value: 78%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">12</span>
                    <span class="ui-sr-only">12:00: 468 ms, slow</span>
                  </span>
                </li>
                <li class="status-slow">
                  <span class="status-bar" style="--value: 94%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">13</span>
                    <span class="ui-sr-only">13:00: 562 ms, slow</span>
                  </span>
                </li>
                <li class="status-slow">
                  <span class="status-bar" style="--value: 70%"></span>
                  <span class="status-hour ui-caption">
                    <span aria-hidden="true">14</span>
                    <span class="ui-sr-only">14:00: 421 ms, slow</span>
                  </span>
                </li>
              </ol>
              <DescriptionList class="status-response-summary">
                <DescriptionListItem>
                  <DescriptionListTerm>Median today</DescriptionListTerm>
                  <DescriptionListDescription>
                    189 ms
                  </DescriptionListDescription>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListTerm>Slowest hour</DescriptionListTerm>
                  <DescriptionListDescription>
                    562 ms at 13:00
                  </DescriptionListDescription>
                </DescriptionListItem>
              </DescriptionList>
            </CardContent>
          </Card>
        </div>
        <Card
          aria-labelledby="server-status-uptime-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 class="ui-h5" id="server-status-uptime-heading">
              Uptime history
            </h2>
            <p>All of Bassbook, 99.93% over the last 30 days.</p>
          </hgroup>
          <CardContent>
            <div
              aria-label="Last 30 days: 27 days without incidents, 3 days with degraded performance."
              class="status-history"
              role="img"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style="--day: var(--ui-warning)"></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style="--day: var(--ui-warning)"></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style="--day: var(--ui-warning)"></span>
            </div>
            <p aria-hidden="true" class="ui-layout-row ui-spread ui-caption">
              <span>9 Sep</span>
              <span>Today</span>
            </p>
          </CardContent>
        </Card>
        <section
          aria-labelledby="server-status-incidents-heading"
          class="ui-layout-column ui-gap-small"
        >
          <h2 class="ui-h5" id="server-status-incidents-heading">
            Incidents
          </h2>
          <div class="ui-layout-column status-incidents">
            <Accordion
              id="server-status-incident-laggy-bass"
              open
              variant="outlined"
            >
              <AccordionSummary>
                <span>
                  Laggy bass on profile songs
                  <span class="ui-layout-row ui-caption status-incident-meta">
                    <Chip
                      as="span"
                      dot
                      label="Identified"
                      severity="warning"
                      size="small"
                    />
                    <span>Started today, 12:04</span>
                  </span>
                </span>
              </AccordionSummary>
              <AccordionContent>
                <Timeline reversed size="small">
                  <TimelineItem datetime="2026-10-08T13:40" time="13:40">
                    <p class="ui-caption">Identified</p>
                    <p>
                      A huge drum solo upload is hogging the disk (of course it
                      is). We're moving it to a separate server.
                    </p>
                  </TimelineItem>
                  <TimelineItem datetime="2026-10-08T12:18" time="12:18">
                    <p class="ui-caption">Investigating</p>
                    <p>
                      We're hearing bass notes arrive late on profile songs and
                      are looking into it. No, Davie504, it's not Charles
                      Berthoud.
                    </p>
                  </TimelineItem>
                </Timeline>
              </AccordionContent>
            </Accordion>
            <Accordion variant="outlined">
              <AccordionSummary>
                <span>
                  Delayed friend requests
                  <span class="ui-layout-row ui-caption status-incident-meta">
                    <Chip
                      as="span"
                      dot
                      label="Resolved"
                      severity="success"
                      size="small"
                    />
                    <span>3 Oct, 47 minutes</span>
                  </span>
                </span>
              </AccordionSummary>
              <AccordionContent>
                <p>
                  A queue worker stopped after a settings change. Friend
                  requests sent between 09:12 and 09:59 arrived late, none were
                  lost. Phew! &lt;3
                </p>
              </AccordionContent>
            </Accordion>
            <Accordion variant="outlined">
              <AccordionSummary>
                <span>
                  Photo uploads failing
                  <span class="ui-layout-row ui-caption status-incident-meta">
                    <Chip
                      as="span"
                      dot
                      label="Resolved"
                      severity="success"
                      size="small"
                    />
                    <span>21 Sep, 1 hour 12 minutes</span>
                  </span>
                </span>
              </AccordionSummary>
              <AccordionContent>
                <p>
                  An expired certificate at our photo host made gear pic uploads
                  fail. Whoops! The certificate was renewed and monitoring now
                  warns 30 days ahead.
                </p>
              </AccordionContent>
            </Accordion>
          </div>
        </section>
        <Dialog closedby="any" id="server-status-subscribe">
          <DialogHeader>
            <DialogTitle>Get status updates</DialogTitle>
            <p>
              We'll email you when something goes wonky and when it's fixed.
            </p>
          </DialogHeader>
          <DialogContent>
            <Form action="#" id="server-status-subscribe-form" method="dialog">
              <Field for="server-status-server-status-email" label="Email">
                <input
                  autocomplete="email"
                  id="server-status-server-status-email"
                  name="server-status-email"
                  placeholder="you@bassmail.example"
                  required
                  type="email"
                />
              </Field>
            </Form>
          </DialogContent>
          <DialogFooter>
            <Button
              command="close"
              commandfor="server-status-subscribe"
              type="button"
            >
              Cancel
            </Button>
            <Button
              form="server-status-subscribe-form"
              type="submit"
              variant="filled"
            >
              Subscribe
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      <style>{`
        .server-status {
          container-type: inline-size;

          .status-chart-card .ui-content {
            padding-block-end: var(--ui-space-7);
          }

          .status-response {
            align-items: end;
            block-size: 9rem;
            border-block-end: var(--ui-border-width) solid var(--ui-border-color);
            display: grid;
            gap: var(--ui-space-1);
            grid-auto-columns: minmax(0, 1fr);
            grid-auto-flow: column;
            list-style-type: none;
            padding: 0;

            li {
              align-items: center;
              block-size: 100%;
              display: grid;
              grid-template-rows: 1fr auto;
              justify-items: center;
              row-gap: var(--ui-space-1);
            }

            .status-bar {
              align-self: end;
              background-color: var(--ui-primary);
              block-size: var(--value);
              border-start-end-radius: var(--ui-radius-small);
              border-start-start-radius: var(--ui-radius-small);
              inline-size: 100%;
            }

            .status-slow .status-bar {
              background-color: var(--ui-warning);
            }

            .status-hour {
              translate: 0 calc(100% + var(--ui-space-1));
            }
          }

          .status-response-summary {
            margin-block-start: var(--ui-space-7);
          }

          .status-history {
            block-size: 2rem;
            display: grid;
            gap: var(--ui-border-width-large);
            grid-auto-columns: minmax(0, 1fr);
            grid-auto-flow: column;

            span {
              background-color: var(--day, var(--ui-success));
              border-radius: var(--ui-radius-small);
            }
          }

          .status-incidents summary > span {
            display: grid;
            flex: 1;
            gap: var(--ui-space-1);
          }

          .status-incident-meta {
            --_gap: var(--ui-space-2);

            font-weight: var(--ui-font-weight-body);
          }
        }
      `}</style>
    </>
  )
}
