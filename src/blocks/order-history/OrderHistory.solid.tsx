/** @jsxImportSource @solidjs/web */
import {
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  Card,
  CardActions,
  CardContent,
  Chip,
  Field,
  FieldGroup,
  List,
  ListItem,
  Menu,
  Progress,
  ToggleButton,
  ToggleGroup,
} from "opui-css/solid"

export default function OrderHistory() {
  return (
    <>
      <div
        class="order-history ui-layout-container ui-layout-column ui-gap-large"
        style="--_max-inline-size: 60rem"
      >
        <div class="ui-layout-row ui-spread">
          <hgroup class="ui-hgroup">
            <h1 class="ui-h3">Order history</h1>
            <p>Track your gear, grab receipts and buy again. Woohoo!</p>
          </hgroup>
        </div>
        <FieldGroup orientation="horizontal">
          <Field
            for="order-history-search"
            start={
              <svg
                data-icon="search"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5m-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
                ></path>
              </svg>
            }
          >
            <input
              aria-label="Search orders"
              id="order-history-search"
              name="search"
              placeholder="Search by order number or gear"
              type="search"
            />
          </Field>
          <ToggleGroup aria-label="Order status" name="order-history-status">
            <ToggleButton defaultChecked value="all">
              All
            </ToggleButton>
            <ToggleButton value="open">Open</ToggleButton>
            <ToggleButton value="delivered">Delivered</ToggleButton>
          </ToggleGroup>
        </FieldGroup>
        <ul class="ui-layout-column ui-gap-large">
          <li>
            <Card
              aria-labelledby="order-history-4821"
              as="article"
              variant="outlined"
            >
              <div class="ui-layout-row ui-spread orders-top">
                <h2 class="ui-h5" id="order-history-4821">
                  Order BB-4821
                </h2>
                <dl class="ui-tabular-nums orders-meta">
                  <div>
                    <dt class="ui-caption">Placed</dt>
                    <dd>
                      <time datetime="2026-10-05">5 Oct 2026</time>
                    </dd>
                  </div>
                  <div>
                    <dt class="ui-caption">Total</dt>
                    <dd>€141.90</dd>
                  </div>
                  <div>
                    <dt class="ui-caption">Ship to</dt>
                    <dd>Mohini Hertz</dd>
                  </div>
                </dl>
                <div class="ui-layout-row ui-gap-small">
                  <Chip
                    as="span"
                    dot
                    label="In transit"
                    severity="info"
                    size="small"
                  />
                </div>
              </div>
              <CardContent>
                <div class="ui-layout-column ui-gap-x-small">
                  <p id="order-history-4821-eta">
                    Arrives <strong>Thursday 8 October</strong>, Fretboard
                    Freight 0037 4821
                  </p>
                  <Progress
                    aria-labelledby="order-history-4821-eta"
                    max={100}
                    value={66}
                  />
                  <div
                    aria-hidden="true"
                    class="ui-layout-row ui-spread ui-caption"
                  >
                    <span>Ordered</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </div>
                <List flush variant="transparent">
                  <ListItem
                    description="Cherry, Long, Qty 1"
                    end={<span class="ui-tabular-nums">€89.00</span>}
                    label="Extra-wide leather strap"
                    start={
                      <div
                        aria-label="Extra-wide leather strap in Cherry"
                        class="orders-thumb"
                        style="--hue: 0"
                        role="img"
                      ></div>
                    }
                  />
                  <ListItem
                    description="Medium, 45–105, Qty 2"
                    end={<span class="ui-tabular-nums">€48.00</span>}
                    label="Flatwound string set"
                    start={
                      <div
                        aria-label="Flatwound string set, medium gauge"
                        class="orders-thumb"
                        style="--hue: 140"
                        role="img"
                      ></div>
                    }
                  />
                </List>
              </CardContent>
              <CardActions class="orders-actions">
                <Button
                  href="#order-history-track"
                  size="small"
                  variant="filled"
                >
                  Track package
                </Button>
                <Button
                  href="#order-history-view"
                  size="small"
                  variant="outlined"
                >
                  View order
                </Button>
                <Button
                  aria-label="More actions for order BB-4821"
                  class="orders-more"
                  command="toggle-popover"
                  commandfor="order-history-menu-4821"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    data-icon="more-vertical"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                    ></path>
                  </svg>
                </Button>
                <Menu
                  align="end"
                  id="order-history-menu-4821"
                  items={[
                    { label: "Download receipt" },
                    { label: "Change delivery" },
                    {
                      borderTop: true,
                      color: "critical",
                      label: "Cancel order",
                    },
                  ]}
                />
              </CardActions>
            </Card>
          </li>
          <li>
            <Card
              aria-labelledby="order-history-4610"
              as="article"
              variant="outlined"
            >
              <div class="ui-layout-row ui-spread orders-top">
                <h2 class="ui-h5" id="order-history-4610">
                  Order BB-4610
                </h2>
                <dl class="ui-tabular-nums orders-meta">
                  <div>
                    <dt class="ui-caption">Placed</dt>
                    <dd>
                      <time datetime="2026-09-14">14 Sep 2026</time>
                    </dd>
                  </div>
                  <div>
                    <dt class="ui-caption">Total</dt>
                    <dd>€239.00</dd>
                  </div>
                  <div>
                    <dt class="ui-caption">Ship to</dt>
                    <dd>Mohini Hertz</dd>
                  </div>
                </dl>
                <div class="ui-layout-row ui-gap-small">
                  <Chip
                    as="span"
                    dot
                    label="Delivered 17 Sep"
                    severity="success"
                    size="small"
                  />
                </div>
              </div>
              <CardContent>
                <List flush variant="transparent">
                  <ListItem
                    description="Rumble red, Qty 1"
                    end={<span class="ui-tabular-nums">€159.00</span>}
                    label="Tiny practice amp, 20 W"
                    start={
                      <div
                        aria-label="Tiny practice amp in Rumble red"
                        class="orders-thumb"
                        style="--hue: -80"
                        role="img"
                      ></div>
                    }
                  />
                  <ListItem
                    description="Clear, Qty 2"
                    end={<span class="ui-tabular-nums">€80.00</span>}
                    label="Hi-fi earplugs (for the drummer)"
                    start={
                      <div
                        aria-label="Hi-fi earplugs in Clear"
                        class="orders-thumb"
                        style="--hue: 200"
                        role="img"
                      ></div>
                    }
                  />
                </List>
              </CardContent>
              <CardActions class="orders-actions">
                <Button size="small" type="button" variant="tonal">
                  <svg
                    data-icon="refresh"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"
                    ></path>
                  </svg>
                  <span class="ui-text">Buy again</span>
                </Button>
                <Button
                  href="#order-history-review"
                  size="small"
                  variant="outlined"
                >
                  Write a review
                </Button>
                <Button
                  aria-label="More actions for order BB-4610"
                  class="orders-more"
                  command="toggle-popover"
                  commandfor="order-history-menu-4610"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    data-icon="more-vertical"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                    ></path>
                  </svg>
                </Button>
                <Menu
                  align="end"
                  id="order-history-menu-4610"
                  items={[
                    { label: "Download receipt" },
                    { label: "Return items" },
                    { label: "Get help" },
                  ]}
                />
              </CardActions>
            </Card>
          </li>
          <li>
            <Card
              aria-labelledby="order-history-4377"
              as="article"
              variant="outlined"
            >
              <div class="ui-layout-row ui-spread orders-top">
                <h2 class="ui-h5" id="order-history-4377">
                  Order BB-4377
                </h2>
                <dl class="ui-tabular-nums orders-meta">
                  <div>
                    <dt class="ui-caption">Placed</dt>
                    <dd>
                      <time datetime="2026-08-22">22 Aug 2026</time>
                    </dd>
                  </div>
                  <div>
                    <dt class="ui-caption">Total</dt>
                    <dd>€33.90</dd>
                  </div>
                  <div>
                    <dt class="ui-caption">Ship to</dt>
                    <dd>Scott Humbucker</dd>
                  </div>
                </dl>
                <div class="ui-layout-row ui-gap-small">
                  <Chip
                    as="span"
                    dot
                    label="Returned"
                    severity="warning"
                    size="small"
                  />
                </div>
              </div>
              <CardContent>
                <List flush variant="transparent">
                  <ListItem
                    description="Faded black, M, Qty 1"
                    end={<span class="ui-tabular-nums">€29.00</span>}
                    label="I'm with the bassist tee"
                    start={
                      <div
                        aria-label="I'm with the bassist tee in Faded black"
                        class="orders-thumb"
                        style="--hue: -80"
                        role="img"
                      ></div>
                    }
                  />
                </List>
                <Callout severity="success">
                  <CalloutIcon />
                  <CalloutContent>
                    <p>
                      Refund of €29.00 sent to your Visa ending 4242 on 3 Sep.
                      Bummer about the size! It can take up to 5 business days
                      to show up.
                    </p>
                  </CalloutContent>
                </Callout>
              </CardContent>
              <CardActions class="orders-actions">
                <Button size="small" type="button" variant="tonal">
                  <svg
                    data-icon="refresh"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"
                    ></path>
                  </svg>
                  <span class="ui-text">Buy again</span>
                </Button>
                <Button
                  href="#order-history-return"
                  size="small"
                  variant="outlined"
                >
                  Return details
                </Button>
              </CardActions>
            </Card>
          </li>
        </ul>
        <div class="ui-layout-row ui-spread">
          <p>Showing 3 of 18 orders</p>
          <Button type="button" variant="outlined">
            Load more
          </Button>
        </div>
      </div>
      <style>{`
        .order-history {
          .orders-top {
            align-items: start;
            border-block-end: var(--ui-border-width) solid var(--ui-border-color);
            padding: var(--ui-space-4);
          }

          .orders-meta {
            display: grid;
            flex: 1 1 24rem;
            gap: var(--ui-space-4) var(--ui-space-6);
            grid-template-columns: repeat(auto-fit, minmax(7rem, max-content));

            dd {
              font-weight: var(--ui-font-weight-label);
            }
          }

          .orders-thumb {
            aspect-ratio: 1;
            background: linear-gradient(
              135deg,
              oklch(from var(--ui-primary) l c calc(h + var(--hue, 0))),
              oklch(from var(--ui-primary) l c calc(h + var(--hue, 0) + 60))
            );
            border-radius: var(--ui-radius);
            inline-size: 3rem;
          }

          .orders-actions {
            align-items: center;

            .orders-more {
              margin-inline-start: auto;
            }
          }
        }
      `}</style>
    </>
  )
}
