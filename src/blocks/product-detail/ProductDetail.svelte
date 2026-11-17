<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionSummary,
    Button,
    Card,
    Carousel,
    Chip,
    FieldDescription,
    FieldLegend,
    Fieldset,
    Form,
    List,
    ListItem,
    NumberField,
    Rating,
    ToggleButton,
    ToggleGroup,
    Tooltip,
    TooltipContent,
  } from "opui-css/svelte"
</script>

<div class="product-detail ui-layout-container ui-layout-column ui-large">
  <nav aria-label="Breadcrumb" class="pd-breadcrumb">
    <ol class="ui-layout-row ui-small">
      <li><a class="ui-link" href="#product-detail-shop">Shop</a></li>
      <li><a class="ui-link" href="#product-detail-gear">Gear</a></li>
      <li><a class="ui-link" href="#product-detail-gig-bags">Gig bags</a></li>
      <li><span aria-current="page">Comfy Cloud Gig Bag</span></li>
    </ol>
  </nav>
  <div class="ui-layout-columns" style="--_gap: var(--ui-space-6)">
    <div class="ui-sticky pd-gallery">
      <Carousel aria-label="Product images" markers tabindex={0}>
        <li>
          <div
            aria-label="Comfy Cloud Gig Bag in Midnight, front view"
            class="pd-image"
            style="--hue: 0"
            role="img"
          ></div>
        </li>
        <li>
          <div
            aria-label="Back view with the padded backpack straps"
            class="pd-image"
            style="--hue: 30"
            role="img"
          ></div>
        </li>
        <li>
          <div
            aria-label="Close-up of the extra-thick padding"
            class="pd-image"
            style="--hue: 60"
            role="img"
          ></div>
        </li>
        <li>
          <div
            aria-label="Carried proudly to a gig"
            class="pd-image"
            style="--hue: 90"
            role="img"
          ></div>
        </li>
      </Carousel>
    </div>
    <div class="ui-layout-column ui-large">
      <hgroup class="ui-hgroup">
        <p class="ui-overline">Bassbook Shop</p>
        <h1 class="ui-h3">Comfy Cloud Gig Bag</h1>
      </hgroup>
      <div class="ui-layout-row ui-small">
        <Rating aria-hidden="true" label="Rated 4.7 out of 5" value={4.7} />
        <span>4.7 out of 5</span>
        <a class="ui-link" href="#product-detail-reviews">128 reviews</a>
      </div>
      <div class="ui-layout-row ui-small pd-price">
        <strong class="ui-tabular-nums">€119.00</strong>
        <s><span class="ui-sr-only">Was{" "}</span>€149.00</s>
        <Chip as="span" label="Save 20%" size="small" />
      </div>
      <p>
        A cosy padded gig bag with backpack straps, a huge pocket for cables and
        snacks, and a secret one for your setlist. Survives the van and the
        drummer.
      </p>
      <Form action="#" class="pd-form">
        <Fieldset class="pd-option">
          <FieldLegend>Color: Midnight</FieldLegend>
          <ToggleGroup aria-label="Color" name="product-detail-color">
            <ToggleButton defaultChecked value="midnight">
              <span aria-hidden="true" class="pd-swatch"></span>
              Midnight
            </ToggleButton>
            <ToggleButton value="bubblegum">
              <span aria-hidden="true" class="pd-swatch" style="--hue: 60"
              ></span>
              Bubblegum
            </ToggleButton>
            <ToggleButton value="glitter">
              <span
                aria-hidden="true"
                class="pd-swatch"
                style="--hue: -80; --lightness: 0.2"
              ></span>
              Glitter
            </ToggleButton>
          </ToggleGroup>
        </Fieldset>
        <Fieldset class="pd-option">
          <FieldLegend>Size</FieldLegend>
          <ToggleGroup aria-label="Size" name="product-detail-size">
            <ToggleButton disabled label="Piccolo" value="piccolo" />
            <ToggleButton label="Short" value="short" />
            <ToggleButton defaultChecked label="Long" value="long" />
            <ToggleButton label="5-string" value="5-string" />
            <ToggleButton label="6-string" value="6-string" />
          </ToggleGroup>
          <FieldDescription>
            Piccolo is sold out. Only 3 left in Long. <a
              class="ui-link"
              href="#product-detail-size-guide">Size guide</a
            >
          </FieldDescription>
        </Fieldset>
        <div class="ui-layout-row ui-small pd-buy">
          <NumberField
            id="product-detail-quantity"
            label="Quantity"
            max={10}
            min={1}
            name="quantity"
            value={1}
          />
          <Button class="pd-add" type="submit" variant="filled">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2m6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2z"
              ></path>
            </svg><span class="ui-text">Add to cart</span>
          </Button>
          <Tooltip id="product-detail-wishlist-tip">
            <Button
              aria-label="Save to wishlist"
              interestfor="product-detail-wishlist-tip"
              type="button"
              variant="outlined"
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
                  d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"
                ></path>
              </svg>
            </Button>
            <TooltipContent>Save to wishlist</TooltipContent>
          </Tooltip>
        </div>
      </Form>
      <List dense flush variant="transparent">
        <ListItem label="Free delivery on orders over €75">
          {#snippet start()}
            <svg
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
          {/snippet}
        </ListItem>
        <ListItem label="Free returns within 60 days">
          {#snippet start()}
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8"
              ></path>
            </svg>
          {/snippet}
        </ListItem>
        <ListItem label="Two-year warranty, free repairs for life">
          {#snippet start()}
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5z"
              ></path>
            </svg>
          {/snippet}
        </ListItem>
      </List>
      <Card class="pd-details" role="group" variant="outlined">
        <Accordion name="product-detail-info" open>
          <AccordionSummary>Details</AccordionSummary>
          <AccordionContent>
            <ul>
              <li>Fits most long scale 4-string basses</li>
              <li>25 mm padding with a fleece lining</li>
              <li>Backpack straps and a grab handle</li>
              <li>Weight: 2.1 kg in Long</li>
            </ul>
          </AccordionContent>
        </Accordion>
        <Accordion name="product-detail-info">
          <AccordionSummary>Materials and care</AccordionSummary>
          <AccordionContent>
            <p>
              Water-resistant recycled nylon with a fleece lining that hugs your
              bass like it deserves. Wipe clean with a damp cloth. Fits one
              bass, not the drummer's ego.
            </p>
          </AccordionContent>
        </Accordion>
        <Accordion name="product-detail-info">
          <AccordionSummary>Shipping and returns</AccordionSummary>
          <AccordionContent>
            <p>
              Ships from our warehouse in Bassville within one business day.
              Order by 14:00 for express delivery in time for your next gig.
            </p>
          </AccordionContent>
        </Accordion>
      </Card>
    </div>
  </div>
</div>

<style>
  :global {
    .product-detail {
      .pd-breadcrumb li + li::before {
        content: "/";
        margin-inline-end: var(--ui-space-2);
      }

      .pd-gallery {
        position: relative;
      }

      .pd-image {
        aspect-ratio: 1;
        background: linear-gradient(
          135deg,
          oklch(from var(--ui-primary) l c calc(h + var(--hue, 0))),
          oklch(from var(--ui-primary) l c calc(h + var(--hue, 0) + 60))
        );
        border-radius: var(--ui-radius);
      }

      .pd-price strong {
        font-size: var(--ui-font-size-700);
      }

      .pd-swatch {
        aspect-ratio: 1;
        background-color: oklch(
          from var(--ui-primary) calc(l + var(--lightness, 0)) c
            calc(h + var(--hue, 0))
        );
        border: var(--ui-border-width) solid var(--ui-border-color);
        border-radius: var(--ui-radius-round);
        inline-size: 1rem;
      }

      .pd-option .ui-toggle-group {
        flex-wrap: wrap;
      }

      .pd-buy {
        align-items: end;

        .pd-add {
          flex: 1 1 12rem;
        }
      }

      .pd-form {
        gap: var(--ui-space-5);
      }

      .pd-details ul {
        padding-inline-start: var(--ui-space-4);
      }
    }
  }
</style>
