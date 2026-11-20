<script lang="ts">
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
    NumberField,
    Progress,
    TextField,
  } from "opui-css/svelte"
</script>

<div class="shopping-cart ui-layout-container ui-layout-column ui-large">
  <hgroup class="ui-hgroup">
    <h1 class="ui-h3">Your gear cart</h1>
    <p>3 totally rad items, prices include VAT</p>
  </hgroup>
  <div class="ui-layout-columns ui-large" style="--_columns: 2fr 1fr">
    <Card aria-label="Cart items" as="section" variant="outlined">
      <ul class="ui-layout-column cart-items">
        <li class="cart-item">
          <div
            aria-label="Comfy Cloud Gig Bag in Midnight"
            class="cart-thumb"
            style="--hue: 0"
            role="img"
          ></div>
          <div class="ui-layout-column ui-x-small cart-info">
            <h2 class="ui-h6">
              <a class="ui-link" href="#shopping-cart-gig-bag"
                >Comfy Cloud Gig Bag</a
              >
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
            <div class="ui-layout-row ui-x-small cart-links">
              <Button size="x-small" type="button">Save for later</Button>
              <Button color="critical" size="x-small" type="button"
                >Remove</Button
              >
            </div>
          </div>
          <div class="cart-buy">
            <NumberField
              hideLabel
              id="shopping-cart-qty-gig-bag"
              label="Quantity of Comfy Cloud Gig Bag"
              min={1}
              name="qty-gig-bag"
              size="small"
              defaultValue={1}
            />
            <p class="ui-tabular-nums cart-line-price">
              €119.00
              <s class="ui-caption"
                ><span class="ui-sr-only">Was{" "}</span>€149.00</s
              >
            </p>
          </div>
        </li>
        <li class="cart-item">
          <div
            aria-label="Flatwound string set, medium gauge"
            class="cart-thumb"
            style="--hue: 140"
            role="img"
          ></div>
          <div class="ui-layout-column ui-x-small cart-info">
            <h2 class="ui-h6">
              <a class="ui-link" href="#shopping-cart-strings"
                >Flatwound string set</a
              >
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
            <div class="ui-layout-row ui-x-small cart-links">
              <Button size="x-small" type="button">Save for later</Button>
              <Button color="critical" size="x-small" type="button"
                >Remove</Button
              >
            </div>
          </div>
          <div class="cart-buy">
            <NumberField
              hideLabel
              id="shopping-cart-qty-strings"
              label="Quantity of Flatwound string set"
              min={1}
              name="qty-strings"
              size="small"
              defaultValue={2}
            />
            <p class="ui-tabular-nums cart-line-price">€48.00</p>
          </div>
        </li>
        <li class="cart-item">
          <div
            aria-label="I'm with the bassist tee in Faded black"
            class="cart-thumb"
            style="--hue: -80"
            role="img"
          ></div>
          <div class="ui-layout-column ui-x-small cart-info">
            <h2 class="ui-h6">
              <a class="ui-link" href="#shopping-cart-tee"
                >I'm with the bassist tee</a
              >
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
            <div class="ui-layout-row ui-x-small cart-links">
              <Button size="x-small" type="button">Save for later</Button>
              <Button color="critical" size="x-small" type="button"
                >Remove</Button
              >
            </div>
          </div>
          <div class="cart-buy">
            <NumberField
              hideLabel
              id="shopping-cart-qty-tee"
              label="Quantity of I'm with the bassist tee"
              min={1}
              name="qty-tee"
              size="small"
              defaultValue={1}
            />
            <p class="ui-tabular-nums cart-line-price">€29.00</p>
          </div>
        </li>
      </ul>
    </Card>
    <Card
      aria-labelledby="shopping-cart-summary-heading"
      as="section"
      class="ui-sticky cart-summary"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="shopping-cart-summary-heading">Order summary</h2>
      </hgroup>
      <CardContent>
        <div class="ui-layout-column ui-small">
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
          <TextField
            id="shopping-cart-discount"
            label="Discount code"
            name="discount"
            placeholder="Enter code"
            type="text"
          />
          <Button type="button">Apply</Button>
        </ControlGroup>
        <div>
          <Chip
            aria-label="Remove code LOWEND10, −10%"
            as="button"
            label="LOWEND10, −10%"
            type="button"
            variant="outlined"
          >
            {#snippet end()}
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
            {/snippet}
          </Chip>
        </div>
        <DescriptionList border="solid" orientation="horizontal">
          <DescriptionListItem>
            <DescriptionListTerm>Subtotal</DescriptionListTerm>
            <DescriptionListDescription>€196.00</DescriptionListDescription>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm>Discount</DescriptionListTerm>
            <DescriptionListDescription>−€19.60</DescriptionListDescription>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm>Delivery</DescriptionListTerm>
            <DescriptionListDescription>Free</DescriptionListDescription>
          </DescriptionListItem>
          <DescriptionListItem total>
            <DescriptionListTerm>Total</DescriptionListTerm>
            <DescriptionListDescription>€176.40</DescriptionListDescription>
          </DescriptionListItem>
        </DescriptionList>
        <Button
          class="cart-checkout"
          href="#shopping-cart-checkout"
          size="large"
          variant="filled">Go to checkout</Button
        >
        <p class="cart-continue">
          or <a class="ui-link" href="#shopping-cart-shop">keep browsing gear</a
          >
        </p>
      </CardContent>
    </Card>
  </div>
</div>

<style>
  :global {
    .shopping-cart {
      .cart-items {
        --_gap: 0;

        li + li {
          border-block-start: var(--ui-border-width) solid
            var(--ui-border-color);
        }
      }

      .cart-item {
        column-gap: var(--ui-space-3);
        display: grid;
        grid-template-areas:
          "thumb info"
          "thumb buy";
        grid-template-columns: auto minmax(0, 1fr);
        padding: var(--ui-space-3);
        row-gap: var(--ui-space-3);

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
        gap: var(--ui-space-3);
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
          gap: var(--ui-space-4);
        }
      }

      .cart-checkout {
        inline-size: 100%;
      }

      .cart-continue {
        text-align: center;
      }
    }
  }
</style>
