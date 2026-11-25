<script lang="ts">
  import {
    Avatar,
    Button,
    Callout,
    CalloutContent,
    CalloutIcon,
    Card,
    CardContent,
    Chip,
    Divider,
  } from "opui-css/svelte"
</script>

<article
  aria-labelledby="article-title"
  class="article ui-layout-container ui-layout-column"
  style="--_gap: var(--ui-space-6); --_max-inline-size: 68rem"
>
  <nav aria-label="Breadcrumb" class="article-breadcrumb ui-caption">
    <ol class="ui-layout-row ui-gap-small">
      <li><a class="ui-link" href="#article-magazine">Magazine</a></li>
      <li><a class="ui-link" href="#article-gear">Gear Talk</a></li>
      <li><span aria-current="page">Flatwounds or roundwounds?</span></li>
    </ol>
  </nav>
  <header class="article-header ui-layout-column">
    <Chip as="span" label="Gear Talk" size="small" />
    <h1 class="article-title" id="article-title">
      Flatwounds or roundwounds? A very long answer to a short question
    </h1>
    <p class="article-lead">
      Every bassist has an opinion about strings, and most of them are loud. We
      asked five players, two luthiers and one very tired sound engineer.
    </p>
    <div class="ui-layout-media ui-gap-small">
      <Avatar label="Holly Humbucker" src="/photos/holly-humbucker.png" />
      <div>
        <p><a class="ui-link" href="#article-author">Holly Humbucker</a></p>
        <p class="ui-caption">
          <time datetime="2026-11-18">18 November 2026</time>, 7 minute read
        </p>
      </div>
    </div>
  </header>
  <figure class="article-cover">
    <img
      alt="A tall pine forest in the fog"
      height="700"
      src="https://picsum.photos/id/1044/1600/700"
      width="1600"
    />
    <figcaption class="ui-caption">
      Where Holly tested six sets of strings: a damp cabin, perfect for rust.
    </figcaption>
  </figure>
  <div
    class="ui-layout-columns ui-breakpoint-small"
    style="--_columns: 13rem 1fr; --_gap: var(--ui-space-8)"
  >
    <nav aria-labelledby="article-toc-heading" class="article-toc ui-sticky">
      <h2 class="ui-overline" id="article-toc-heading">On this page</h2>
      <ol class="ui-layout-column ui-gap-small">
        <li><a class="ui-link" href="#article-sound">How they sound</a></li>
        <li><a class="ui-link" href="#article-feel">How they feel</a></li>
        <li><a class="ui-link" href="#article-verdict">The verdict</a></li>
      </ol>
    </nav>
    <div class="article-body ui-rich-text">
      <p>
        Strings are the cheapest way to change how your bass sounds, and the
        most argued about. Roundwounds are wrapped in round wire, so the surface
        has ridges. Flatwounds are wrapped in flat ribbon, so the surface is
        smooth. That one difference changes almost everything.
      </p>
      <h2 id="article-sound">How they sound</h2>
      <p>
        Roundwounds are bright and growly, with lots of high end for slap and
        pick playing. Flatwounds are warm and thumpy, the sound on most records
        from the sixties. Neither is better, but one of them is probably what
        your favourite bassist plays.
      </p>
      <blockquote>
        <p>I put flats on for one gig as a joke. That was nine years ago.</p>
      </blockquote>
      <h2 id="article-feel">How they feel</h2>
      <p>What the players noticed in their first week:</p>
      <ul>
        <li>
          Flatwounds are kinder to fingertips and to fretless fingerboards.
        </li>
        <li>Roundwounds squeak on slides, which some players love.</li>
        <li>Flatwounds last for years, roundwounds go dull in months.</li>
      </ul>
      <Callout severity="info">
        <CalloutIcon />
        <CalloutContent>
          <p>
            Change one string first. If you hate it, you've spent the price of a
            coffee instead of a whole set.
          </p>
        </CalloutContent>
      </Callout>
      <h2 id="article-verdict">The verdict</h2>
      <p>
        Play what makes you want to practise. If you're still not sure, put
        roundwounds on one bass and flatwounds on the other, and tell everyone
        it's for the tone.
      </p>
    </div>
  </div>
  <Divider />
  <div class="ui-layout-row ui-spread">
    <ul aria-label="Tags" class="ui-layout-row ui-gap-small">
      <li>
        <Chip
          href="#article-tag-strings"
          label="Strings"
          size="small"
          variant="outlined"
        />
      </li>
      <li>
        <Chip
          href="#article-tag-tone"
          label="Tone"
          size="small"
          variant="outlined"
        />
      </li>
      <li>
        <Chip
          href="#article-tag-fretless"
          label="Fretless"
          size="small"
          variant="outlined"
        />
      </li>
    </ul>
    <Button size="small" type="button" variant="outlined">
      <svg
        data-icon="share"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M14 3a1 1 0 1 1 0 2H7.5A2.5 2.5 0 0 0 5 7.5v17A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5V19a1 1 0 1 1 2 0v5.5a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3zm5.58-.907a1 1 0 0 1 1.067.146l10 8.5a1 1 0 0 1 0 1.523l-10 8.5A1 1 0 0 1 18.999 20v-3.96c-3.193.258-5.636 1.722-7.34 3.213a15.6 15.6 0 0 0-2.115 2.26c-.234.307-.407.56-.52.733c-.085.13-.136.215-.152.243l-.006.006l.001.001A1 1 0 0 1 7 22.036c0-.222-.003-.444.003-.666c.011-.406.042-.982.12-1.67c.155-1.37.5-3.218 1.265-5.08s1.967-3.776 3.855-5.225C13.948 8.086 16.161 7.2 19 7.032V3a1 1 0 0 1 .58-.907M20.998 8a1 1 0 0 1-1 1c-2.925 0-5.018.814-6.539 1.98c-1.533 1.177-2.551 2.763-3.224 4.4a16.5 16.5 0 0 0-.957 3.38c.318-.33.672-.672 1.062-1.013C12.462 15.891 15.687 14 19.999 14a1 1 0 0 1 1 1v2.838l7.456-6.338L21 5.161z"
        ></path>
      </svg>
      <span class="ui-text">Share</span>
    </Button>
  </div>
  <Card aria-labelledby="article-author" as="section" variant="tonal">
    <CardContent>
      <div class="ui-layout-media">
        <Avatar
          label="Holly Humbucker"
          size="large"
          src="/photos/holly-humbucker.png"
        />
        <div class="ui-layout-column ui-gap-small">
          <h2 class="ui-h5" id="article-author">About Holly Humbucker</h2>
          <p>
            Fretless player, string hoarder and our gear editor. Holly has owned
            41 basses and regrets selling every single one.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</article>

<style>
  :global {
    .article {
      container-type: inline-size;

      .article-breadcrumb li + li::before {
        content: "/";
        margin-inline-end: var(--ui-space-2);
      }

      .article-header {
        align-items: start;
        max-inline-size: 46rem;
      }

      .article-title {
        font-size: clamp(
          var(--ui-font-size-700),
          6cqi,
          var(--ui-font-size-900)
        );
        letter-spacing: var(--ui-letter-spacing-heading);
        line-height: var(--ui-line-height-tight);
        text-wrap: balance;
      }

      .article-lead {
        font-size: var(--ui-font-size-large);
        text-wrap: pretty;
      }

      .article-cover {
        margin: 0;

        img {
          aspect-ratio: 16 / 7;
          border-radius: var(--ui-radius);
          inline-size: 100%;
          object-fit: cover;
        }

        figcaption {
          margin-block-start: var(--ui-space-2);
        }
      }

      .article-toc {
        font-size: var(--ui-font-size-small);

        ol {
          border-inline-start: var(--ui-border-width) solid
            var(--ui-border-color);
          padding-inline-start: var(--ui-space-4);
        }
      }

      .article-body {
        max-inline-size: 42rem;
      }
    }
  }
</style>
