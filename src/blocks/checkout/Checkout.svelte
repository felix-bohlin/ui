<script lang="ts">
  import {
    Button,
    Callout,
    CalloutContent,
    Card,
    CardContent,
    Checkbox,
    ControlGroup,
    DescriptionList,
    DescriptionListDescription,
    DescriptionListItem,
    DescriptionListTerm,
    Divider,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    List,
    ListItem,
    RadioInput,
    Select,
    Stepper,
    Tabs,
    TabsItem,
    TabsLabel,
    TabsPanel,
    TextField,
  } from "opui-css/svelte"
</script>

<div class="checkout ui-layout-container ui-layout-column ui-large">
  <hgroup class="ui-hgroup">
    <p>Bassbook Shop</p>
    <h1 class="ui-h3">Checkout</h1>
  </hgroup>
  <Stepper
    aria-label="Checkout steps"
    current={1}
    items={[
      { href: "#checkout-cart", label: "Cart" },
      { label: "Details" },
      { label: "Confirmation" },
    ]}
    orientation="horizontal"
  />
  <div
    class="ui-layout-columns"
    style="--_columns: 3fr 2fr; --_gap: var(--ui-space-6)"
  >
    <Form action="#">
      <Fieldset>
        <FieldLegend>Contact</FieldLegend>
        <FieldGroup>
          <TextField for="checkout-email" label="Email">
            <input
              autocomplete="email"
              id="checkout-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
              value="ines.hertz@example.com"
            />
          </TextField>
          <Checkbox defaultChecked id="checkout-news" name="news">
            Email me about new gear and totally rad offers
          </Checkbox>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Shipping address</FieldLegend>
        <FieldGroup>
          <FieldGroup orientation="horizontal">
            <TextField for="checkout-first-name" label="First name">
              <input
                autocomplete="given-name"
                id="checkout-first-name"
                name="first-name"
                required
                type="text"
                value="Ines"
              />
            </TextField>
            <TextField for="checkout-last-name" label="Last name">
              <input
                autocomplete="family-name"
                id="checkout-last-name"
                name="last-name"
                required
                type="text"
                value="Hertz"
              />
            </TextField>
          </FieldGroup>
          <TextField for="checkout-address" label="Street address">
            <input
              autocomplete="address-line1"
              id="checkout-address"
              name="address"
              required
              type="text"
              value="4 Drop D Drive"
            />
          </TextField>
          <FieldGroup orientation="horizontal">
            <TextField for="checkout-postal-code" label="Postal code">
              <input
                autocomplete="postal-code"
                id="checkout-postal-code"
                inputmode="numeric"
                name="postal-code"
                required
                type="text"
                value="444 44"
              />
            </TextField>
            <TextField for="checkout-city" label="City">
              <input
                autocomplete="address-level2"
                id="checkout-city"
                name="city"
                required
                type="text"
                value="Bassville"
              />
            </TextField>
          </FieldGroup>
          <FieldGroup orientation="horizontal">
            <Select
              autocomplete="country-name"
              id="checkout-country"
              items={[
                { label: "Denmark", value: "dk" },
                { label: "Finland", value: "fi" },
                { label: "Norway", value: "no" },
                { label: "Sweden", selected: true, value: "se" },
              ]}
              label="Country"
              name="country"
            />
            <TextField
              endText="Only for delivery updates, promise!"
              for="checkout-phone"
              label="Phone"
            >
              <input
                aria-describedby="checkout-phone-end-text"
                autocomplete="tel"
                id="checkout-phone"
                name="phone"
                type="tel"
                value="555 0144"
              />
            </TextField>
          </FieldGroup>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Delivery</FieldLegend>
        <List bordered class="checkout-delivery" variant="transparent">
          <ListItem
            choice="radio"
            description="3–5 business days to a pickup point"
            for="checkout-delivery-standard"
          >
            {#snippet label()}
              Standard, <span class="ui-tabular-nums checkout-price">€4.90</span
              >
            {/snippet}
            {#snippet end()}
              <RadioInput
                defaultChecked
                id="checkout-delivery-standard"
                name="checkout-delivery"
                value="standard"
              />
            {/snippet}
          </ListItem>
          <ListItem
            choice="radio"
            description="2–3 business days, evening slot"
            for="checkout-delivery-home"
          >
            {#snippet label()}
              Home delivery, <span class="ui-tabular-nums checkout-price"
                >€9.90</span
              >
            {/snippet}
            {#snippet end()}
              <RadioInput
                id="checkout-delivery-home"
                name="checkout-delivery"
                value="home"
              />
            {/snippet}
          </ListItem>
          <ListItem
            choice="radio"
            description="Next business day, in time for the gig!"
            for="checkout-delivery-express"
          >
            {#snippet label()}
              Express, <span class="ui-tabular-nums checkout-price">€19.00</span
              >
            {/snippet}
            {#snippet end()}
              <RadioInput
                id="checkout-delivery-express"
                name="checkout-delivery"
                value="express"
              />
            {/snippet}
          </ListItem>
        </List>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Payment</FieldLegend>
        <Tabs name="checkout-payment" style="--_panel-gap: var(--ui-space-4)">
          <TabsItem defaultChecked id="checkout-pay-card" value="card">
            <TabsLabel>Card</TabsLabel>
            <TabsPanel>
              <FieldGroup>
                <TextField for="checkout-card-number" label="Card number">
                  <input
                    aria-describedby="checkout-card-number-start"
                    autocomplete="cc-number"
                    id="checkout-card-number"
                    inputmode="numeric"
                    name="card-number"
                    placeholder="1234 1234 1234 1234"
                    type="text"
                  />
                  {#snippet start()}
                    <svg
                      data-icon="credit-card"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 14H4v-6h16zm0-10H4V6h16z"
                      ></path>
                    </svg>
                  {/snippet}
                </TextField>
                <FieldGroup orientation="horizontal">
                  <TextField for="checkout-card-expiry" label="Expiry date">
                    <input
                      autocomplete="cc-exp"
                      id="checkout-card-expiry"
                      inputmode="numeric"
                      name="card-expiry"
                      placeholder="MM / YY"
                      type="text"
                    />
                  </TextField>
                  <TextField for="checkout-card-cvc" label="Security code">
                    <input
                      autocomplete="cc-csc"
                      id="checkout-card-cvc"
                      inputmode="numeric"
                      name="card-cvc"
                      placeholder="CVC"
                      type="text"
                    />
                  </TextField>
                </FieldGroup>
                <Checkbox defaultChecked name="billing-same">
                  Billing address is the same as shipping
                </Checkbox>
              </FieldGroup>
            </TabsPanel>
          </TabsItem>
          <TabsItem id="checkout-pay-invoice" value="invoice">
            <TabsLabel>Invoice</TabsLabel>
            <TabsPanel>
              <p>
                Pay within 30 days of delivery. We'll email the invoice to
                ines.hertz@example.com once your gear ships.
              </p>
            </TabsPanel>
          </TabsItem>
          <TabsItem id="checkout-pay-wallet" value="wallet">
            <TabsLabel>Wallet</TabsLabel>
            <TabsPanel>
              <p>
                You'll confirm the payment in your wallet app after placing the
                order.
              </p>
            </TabsPanel>
          </TabsItem>
        </Tabs>
      </Fieldset>
      <FieldGroup>
        <Button
          class="checkout-submit"
          size="large"
          type="submit"
          variant="filled"
        >
          Pay €154.30
        </Button>
        <p class="ui-layout-row ui-x-small ui-align-center ui-caption">
          <svg
            data-icon="lock"
            aria-hidden="true"
            class="ui-icon ui-small"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z"
            ></path>
          </svg>
          Payments are encrypted and processed securely
        </p>
      </FieldGroup>
    </Form>
    <Card
      aria-labelledby="checkout-summary-heading"
      as="section"
      class="ui-sticky checkout-summary"
      variant="outlined"
    >
      <hgroup>
        <h2 class="ui-h5" id="checkout-summary-heading">Order summary</h2>
        <p>3 items</p>
      </hgroup>
      <CardContent>
        <List flush variant="transparent">
          <ListItem
            description="Cherry, Long, Qty 1"
            label="Extra-wide leather strap"
          >
            {#snippet start()}
              <div
                aria-label="Extra-wide leather strap in Cherry"
                class="checkout-thumb"
                role="img"
                style="--hue: 0"
              ></div>
            {/snippet}
            {#snippet end()}
              <span class="ui-tabular-nums checkout-price">€89.00</span>
            {/snippet}
          </ListItem>
          <ListItem
            description="Faded black, M, Qty 1"
            label="I'm with the bassist tee"
          >
            {#snippet start()}
              <div
                aria-label="I'm with the bassist tee in Faded black"
                class="checkout-thumb"
                role="img"
                style="--hue: -80"
              ></div>
            {/snippet}
            {#snippet end()}
              <span class="ui-tabular-nums checkout-price">€29.00</span>
            {/snippet}
          </ListItem>
          <ListItem
            description="Medium, 45–105, Qty 2"
            label="Flatwound string set"
          >
            {#snippet start()}
              <div
                aria-label="Flatwound string set, medium gauge"
                class="checkout-thumb"
                role="img"
                style="--hue: 140"
              ></div>
            {/snippet}
            {#snippet end()}
              <span class="ui-tabular-nums checkout-price">€48.00</span>
            {/snippet}
          </ListItem>
        </List>
        <Divider />
        <ControlGroup size="small" variant="outlined">
          <TextField for="checkout-discount" label="Discount code">
            <input
              id="checkout-discount"
              name="discount"
              type="text"
              value="LOWEND10"
            />
          </TextField>
          <Button type="button">Apply</Button>
        </ControlGroup>
        <DescriptionList border="solid" orientation="horizontal">
          <DescriptionListItem>
            <DescriptionListTerm>Subtotal</DescriptionListTerm>
            <DescriptionListDescription>€166.00</DescriptionListDescription>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm>Discount (LOWEND10)</DescriptionListTerm>
            <DescriptionListDescription>−€16.60</DescriptionListDescription>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm>Shipping</DescriptionListTerm>
            <DescriptionListDescription>€4.90</DescriptionListDescription>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm>VAT (25%, included)</DescriptionListTerm>
            <DescriptionListDescription>€30.86</DescriptionListDescription>
          </DescriptionListItem>
          <DescriptionListItem total>
            <DescriptionListTerm>Total</DescriptionListTerm>
            <DescriptionListDescription>€154.30</DescriptionListDescription>
          </DescriptionListItem>
        </DescriptionList>
        <Callout severity="info">
          <svg
            data-icon="truck"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m13.5-9 1.96 2.5H17V9.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"
            ></path>
          </svg>
          <CalloutContent>
            <p>
              Free returns within 60 days, no hard feelings. Need help? <a
                class="ui-link"
                href="#checkout-support">Chat with us</a
              >.
            </p>
          </CalloutContent>
        </Callout>
      </CardContent>
    </Card>
  </div>
</div>

<style>
  :global {
    .checkout {
      .checkout-delivery {
        border: var(--ui-border-width) solid var(--ui-border-color);
        border-radius: var(--ui-radius);
        overflow: hidden;
      }

      .checkout-price {
        font-weight: var(--ui-font-weight-semibold);
      }

      .checkout-submit {
        inline-size: 100%;
      }

      .checkout-thumb {
        aspect-ratio: 1;
        background: linear-gradient(
          135deg,
          oklch(from var(--ui-primary) l c calc(h + var(--hue, 0))),
          oklch(from var(--ui-primary) l c calc(h + var(--hue, 0) + 60))
        );
        border-radius: var(--ui-radius);
        inline-size: 3rem;
      }
    }
  }
</style>
