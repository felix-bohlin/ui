<script lang="ts">
  import {
    Avatar,
    Card,
    CardContent,
    Carousel,
    Drawer,
    DrawerContent,
    DrawerHeader,
  } from "opui-css/svelte"

  const photos = [
    {
      alt: "Photo 1 of 4: a deep blue fjord between steep mountains",
      height: 450,
      id: 1015,
      width: 800,
    },
    {
      alt: "Photo 2 of 4: a lighthouse on a rocky shore",
      height: 800,
      id: 1043,
      width: 600,
    },
    {
      alt: "Photo 3 of 4: yellow tents in a snowy mountain camp",
      height: 450,
      id: 1036,
      width: 800,
    },
    {
      alt: "Photo 4 of 4: a tall pine forest in the fog",
      height: 800,
      id: 1044,
      width: 600,
    },
  ]
</script>

<div class="lightbox">
  <Card as="article" variant="outlined">
    <CardContent class="ui-layout-column">
      <div class="ui-layout-media">
        <Avatar aria-hidden="true">FF</Avatar>
        <div>
          <p>Fiona Fretless</p>
          <p class="ui-caption">
            <time datetime="2026-07-18">Jul 18, 2026</time>
          </p>
        </div>
      </div>
      <p>
        Four days of bass camp in the mountains. No amps, no drummers, just
        fjords and a very patient lighthouse keeper.
      </p>
    </CardContent>
    <button
      class="lightbox-open"
      command="show-modal"
      commandfor="lightbox-viewer"
      type="button"
    >
      <img
        alt=""
        height={450}
        src="https://picsum.photos/id/1015/800/450"
        width={800}
      />
      <span><span class="ui-sr-only">View all{" "}</span>4 photos</span>
    </button>
  </Card>
  <Drawer
    aria-label="Photos from bass camp"
    class="lightbox-viewer"
    id="lightbox-viewer"
    side="block-end"
    style="--lightbox-photos: 4"
  >
    <DrawerHeader closeButton closeLabel="Close photos">
      <span aria-hidden="true" class="lightbox-count"></span>
    </DrawerHeader>
    <DrawerContent>
      <Carousel
        aria-label="Photos from bass camp"
        data-drawer-swipe=""
        tabindex={0}
      >
        {#each photos as { alt, height, id, width } (id)}
          <li>
            <img
              {alt}
              {height}
              loading="lazy"
              src={`https://picsum.photos/id/${id}/${width}/${height}`}
              {width}
            />
          </li>
        {/each}
      </Carousel>
    </DrawerContent>
  </Drawer>
</div>

<style>
  :global {
    @property --lightbox-photo {
      inherits: true;
      initial-value: 1;
      syntax: "<integer>";
    }

    @keyframes lightbox-count {
      to {
        --lightbox-photo: var(--lightbox-photos);
      }
    }

    .lightbox {
      .lightbox-open {
        background: none;
        border: 0;
        cursor: zoom-in;
        display: grid;
        padding: 0;

        & > * {
          grid-area: 1 / 1;
        }

        img {
          aspect-ratio: 16 / 9;
          block-size: auto;
          inline-size: 100%;
          object-fit: cover;
        }

        & > span {
          background-color: oklch(0% 0 0 / 60%);
          border-radius: var(--ui-radius-round);
          color: oklch(100% 0 0);
          font-size: var(--ui-font-size-caption);
          font-weight: var(--ui-font-weight-semibold);
          margin: var(--ui-space-3);
          padding: var(--ui-space-1) var(--ui-space-3);
          place-self: end;
        }
      }
    }

    /* Dark in either color scheme: photos look best on black. */
    dialog.lightbox-viewer {
      --_backdrop-bg-color: oklch(0% 0 0 / 60%);
      --_bg-color: oklch(12% 0 0);
      --_block-size: 100dvb;
      --_border-width: 0px;
      --_shadow: none;

      color-scheme: dark;
      timeline-scope: --lightbox-photos;

      & > .ui-header {
        justify-content: space-between;
      }

      & > .ui-content {
        display: flex;
        overflow: hidden;
        padding: 0;
      }

      /* The number of the photo in view, from how far the row has scrolled.
         Without scroll timelines it stays empty. */
      .lightbox-count {
        font-variant-numeric: tabular-nums;
        font-weight: var(--ui-font-weight-semibold);

        @supports (animation-timeline: scroll()) {
          animation: lightbox-count linear both;
          animation-timeline: --lightbox-photos;
          counter-reset: photo var(--lightbox-photo) photos
            var(--lightbox-photos);

          &::before {
            content: counter(photo) " / " counter(photos);
          }
        }
      }

      /* One photo per view, whole. Sideways it scrolls, and a swipe down on
         it closes the viewer (data-drawer-swipe). */
      .ui-carousel {
        --_block-room: 0px;
        --_inline-room: 0px;
        --_media-aspect-ratio: auto;
        --_media-fit: contain;
        --_media-radius: 0px;

        block-size: 100%;
        flex: 1;
        /* The row is as tall as the viewer, not as the tallest photo. */
        grid-auto-rows: 100%;
        min-block-size: 0;
        scroll-timeline: --lightbox-photos inline;

        &:focus-visible {
          outline-offset: calc(-1 * var(--ui-focus-ring-width));
        }

        & > li {
          min-block-size: 0;
        }

        img {
          block-size: 100%;
        }
      }
    }
  }
</style>
