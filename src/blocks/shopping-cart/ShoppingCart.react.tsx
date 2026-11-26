import {
  Button,
  Card,
  CardContent,
  Chip,
  ControlGroup,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
  Field,
  Progress,
  StepButton,
} from "opui-css/react"

export default function ShoppingCart() {
  return (
    <>
      <div className="shopping-cart ui-layout-container ui-layout-column ui-gap-large">
        <hgroup className="ui-hgroup">
          <h1 className="ui-h3">Your gear cart</h1>
          <p>3 totally rad items, prices include VAT</p>
        </hgroup>
        <div
          className="ui-layout-columns ui-gap-large"
          style={{ "--_columns": "2fr 1fr" }}
        >
          <Card aria-label="Cart items" as="section" variant="outlined">
            <ul className="ui-layout-column cart-items">
              <li className="cart-item">
                <div
                  aria-label="Comfy Cloud Gig Bag in Midnight"
                  className="cart-thumb"
                  style={{ "--hue": "0" }}
                  role="img"
                ></div>
                <div className="ui-layout-column ui-gap-x-small cart-info">
                  <h2 className="ui-h6">
                    <a className="ui-link" href="#shopping-cart-gig-bag">
                      Comfy Cloud Gig Bag
                    </a>
                  </h2>
                  <p>Midnight, Long scale</p>
                  <p>
                    <Chip
                      as="span"
                      dot
                      label="In stock, ships today"
                      severity="success"
                      size="small"
                    />
                  </p>
                  <div className="ui-layout-row ui-gap-x-small cart-links">
                    <Button size="x-small" type="button">
                      Save for later
                    </Button>
                    <Button color="critical" size="x-small" type="button">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="cart-buy">
                  <Field
                    autoFit
                    end={
                      <StepButton
                        command="--step-up"
                        htmlFor="shopping-cart-qty-gig-bag"
                      />
                    }
                    hideLabel
                    htmlFor="shopping-cart-qty-gig-bag"
                    label="Quantity of Comfy Cloud Gig Bag"
                    size="small"
                    start={
                      <StepButton
                        command="--step-down"
                        htmlFor="shopping-cart-qty-gig-bag"
                      />
                    }
                  >
                    <input
                      id="shopping-cart-qty-gig-bag"
                      min="1"
                      name="qty-gig-bag"
                      type="number"
                      defaultValue="1"
                    />
                  </Field>
                  <p className="ui-tabular-nums cart-line-price">
                    €119.00
                    <s className="ui-caption">
                      <span className="ui-sr-only">Was </span>€149.00
                    </s>
                  </p>
                </div>
              </li>
              <li className="cart-item">
                <div
                  aria-label="Flatwound string set, medium gauge"
                  className="cart-thumb"
                  style={{ "--hue": "140" }}
                  role="img"
                ></div>
                <div className="ui-layout-column ui-gap-x-small cart-info">
                  <h2 className="ui-h6">
                    <a className="ui-link" href="#shopping-cart-strings">
                      Flatwound string set
                    </a>
                  </h2>
                  <p>Medium, 45–105</p>
                  <p>
                    <Chip
                      as="span"
                      dot
                      label="In stock, ships today"
                      severity="success"
                      size="small"
                    />
                  </p>
                  <div className="ui-layout-row ui-gap-x-small cart-links">
                    <Button size="x-small" type="button">
                      Save for later
                    </Button>
                    <Button color="critical" size="x-small" type="button">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="cart-buy">
                  <Field
                    autoFit
                    end={
                      <StepButton
                        command="--step-up"
                        htmlFor="shopping-cart-qty-strings"
                      />
                    }
                    hideLabel
                    htmlFor="shopping-cart-qty-strings"
                    label="Quantity of Flatwound string set"
                    size="small"
                    start={
                      <StepButton
                        command="--step-down"
                        htmlFor="shopping-cart-qty-strings"
                      />
                    }
                  >
                    <input
                      id="shopping-cart-qty-strings"
                      min="1"
                      name="qty-strings"
                      type="number"
                      defaultValue="2"
                    />
                  </Field>
                  <p className="ui-tabular-nums cart-line-price">€48.00</p>
                </div>
              </li>
              <li className="cart-item">
                <div
                  aria-label="I'm with the bassist tee in Faded black"
                  className="cart-thumb"
                  style={{ "--hue": "-80" }}
                  role="img"
                ></div>
                <div className="ui-layout-column ui-gap-x-small cart-info">
                  <h2 className="ui-h6">
                    <a className="ui-link" href="#shopping-cart-tee">
                      I'm with the bassist tee
                    </a>
                  </h2>
                  <p>Faded black, Size M</p>
                  <p>
                    <Chip
                      as="span"
                      dot
                      label="Back in stock 21 Oct"
                      severity="warning"
                      size="small"
                    />
                  </p>
                  <div className="ui-layout-row ui-gap-x-small cart-links">
                    <Button size="x-small" type="button">
                      Save for later
                    </Button>
                    <Button color="critical" size="x-small" type="button">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="cart-buy">
                  <Field
                    autoFit
                    end={
                      <StepButton
                        command="--step-up"
                        htmlFor="shopping-cart-qty-tee"
                      />
                    }
                    hideLabel
                    htmlFor="shopping-cart-qty-tee"
                    label="Quantity of I'm with the bassist tee"
                    size="small"
                    start={
                      <StepButton
                        command="--step-down"
                        htmlFor="shopping-cart-qty-tee"
                      />
                    }
                  >
                    <input
                      id="shopping-cart-qty-tee"
                      min="1"
                      name="qty-tee"
                      type="number"
                      defaultValue="1"
                    />
                  </Field>
                  <p className="ui-tabular-nums cart-line-price">€29.00</p>
                </div>
              </li>
            </ul>
          </Card>
          <Card
            aria-labelledby="shopping-cart-summary-heading"
            as="section"
            className="ui-sticky cart-summary"
            variant="outlined"
          >
            <hgroup>
              <h2 className="ui-h5" id="shopping-cart-summary-heading">
                Order summary
              </h2>
            </hgroup>
            <CardContent>
              <div className="ui-layout-column ui-gap-small">
                <p id="shopping-cart-free-shipping">
                  Woohoo, you've unlocked <strong>free delivery</strong>!
                </p>
                <Progress
                  aria-labelledby="shopping-cart-free-shipping"
                  max={75}
                  value={75}
                />
              </div>
              <ControlGroup size="small" variant="outlined">
                <Field htmlFor="shopping-cart-discount" label="Discount code">
                  <input
                    id="shopping-cart-discount"
                    name="discount"
                    placeholder="Enter code"
                    type="text"
                  />
                </Field>
                <Button type="button">Apply</Button>
              </ControlGroup>
              <div>
                <Chip
                  aria-label="Remove code BASS10, −10%"
                  as="button"
                  end={
                    <svg
                      data-icon="close"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                      ></path>
                    </svg>
                  }
                  label="BASS10, −10%"
                  type="button"
                  variant="outlined"
                />
              </div>
              <DescriptionList leader="solid" orientation="horizontal">
                <DescriptionListItem>
                  <DescriptionListTerm>Subtotal</DescriptionListTerm>
                  <DescriptionListDescription>
                    €196.00
                  </DescriptionListDescription>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListTerm>Discount</DescriptionListTerm>
                  <DescriptionListDescription>
                    −€19.60
                  </DescriptionListDescription>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListTerm>Delivery</DescriptionListTerm>
                  <DescriptionListDescription>Free</DescriptionListDescription>
                </DescriptionListItem>
                <DescriptionListItem total>
                  <DescriptionListTerm>Total</DescriptionListTerm>
                  <DescriptionListDescription>
                    €176.40
                  </DescriptionListDescription>
                </DescriptionListItem>
              </DescriptionList>
              <Button
                className="cart-checkout"
                href="#shopping-cart-checkout"
                size="large"
                variant="filled"
              >
                Go to checkout
              </Button>
              <p className="cart-continue">
                or{" "}
                <a className="ui-link" href="#shopping-cart-shop">
                  keep browsing gear
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <style>{`
        .shopping-cart {
          .cart-items {
            --_gap: 0;

            li + li {
              border-block-start: var(--ui-border-width) solid var(--ui-border-color);
            }
          }

          .cart-item {
            column-gap: var(--ui-space-4);
            display: grid;
            grid-template-areas:
              "thumb info"
              "thumb buy";
            grid-template-columns: auto minmax(0, 1fr);
            padding: var(--ui-space-4);
            row-gap: var(--ui-space-4);

            @container (inline-size >= 40rem) {
              grid-template-areas: "thumb info buy";
              grid-template-columns: auto minmax(0, 1fr) auto;
            }
          }

          .cart-thumb {
            aspect-ratio: 1;
            background: linear-gradient(
              135deg,
              oklch(from var(--ui-primary) l c calc(h + var(--hue, 0))),
              oklch(from var(--ui-primary) l c calc(h + var(--hue, 0) + 60))
            );
            border-radius: var(--ui-radius);
            grid-area: thumb;
            inline-size: 5rem;
          }

          .cart-info {
            align-items: start;
            grid-area: info;
          }

          .cart-links {
            margin-inline-start: calc(var(--ui-space-2) * -1);
          }

          .cart-buy {
            align-items: center;
            display: flex;
            gap: var(--ui-space-4);
            grid-area: buy;
            justify-content: space-between;

            @container (inline-size >= 40rem) {
              align-items: end;
              flex-direction: column-reverse;
              justify-content: start;
            }
          }

          .cart-line-price {
            font-weight: var(--ui-font-weight-semibold);
            text-align: end;

            s {
              display: block;
              font-weight: var(--ui-font-weight-normal);
            }
          }

          .cart-summary {
            .ui-content {
              display: grid;
              gap: var(--ui-space-5);
            }
          }

          .cart-checkout {
            inline-size: 100%;
          }

          .cart-continue {
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}
