<script setup lang="ts">
import {
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  Chip,
  Timeline,
  TimelineItem,
} from "opui-css/vue"
</script>

<template>
  <div
    class="changelog ui-layout-container ui-layout-column ui-gap-large"
    style="--_max-inline-size: 56rem"
  >
    <div class="ui-layout-row ui-spread changelog-header">
      <hgroup class="ui-hgroup">
        <p>Bassbook news</p>
        <h1 class="ui-h2">What's new!</h1>
        <p>Totally rad new stuff, tweaks and fixes in every release.</p>
      </hgroup>
      <div class="ui-layout-row ui-gap-small">
        <Button href="#changelog-rss" size="small" variant="outlined"
          ><svg
            data-icon="rss"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 3a1 1 0 0 0 0 2 14 14 0 0 1 14 14 1 1 0 1 0 2 0A16 16 0 0 0 5 3m0 5a1 1 0 0 0 0 2 9 9 0 0 1 9 9 1 1 0 1 0 2 0A11 11 0 0 0 5 8m1 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
            ></path></svg
          ><span class="ui-text">RSS feed</span></Button
        >
        <Button href="#changelog-subscribe" size="small" variant="filled">
          Email me the news!
        </Button>
      </div>
    </div>
    <Timeline style="--_item-gap: var(--ui-space-8)">
      <TimelineItem current datetime="2026-10-01" time="Oct 1, 2026">
        <div class="ui-layout-column">
          <div class="ui-layout-row ui-gap-small">
            <h2 class="ui-h4" id="changelog-6-0">
              The Megaphone shoutbox is here!
            </h2>
            <Chip as="span" label="v6.0.0 (latest)" size="small" />
          </div>
          <div
            class="changelog-cover"
            role="img"
            aria-label="The Megaphone shoutbox, full of bass shoutouts"
          ></div>
          <p>
            Bassbook 6.0 brings the Megaphone, so you can finally be heard over
            the drummer, and profiles now load 3× faster. Woohoo!
          </p>
          <div class="ui-layout-column ui-gap-small changelog-group">
            <h3 class="ui-h6 ui-layout-row ui-gap-small">
              <span class="ui-swatch ui-success"></span>Added
            </h3>
            <ul>
              <li>A Megaphone shoutbox on every profile and group page.</li>
              <li>
                A volume slider that only goes up. Nobody can say “turn it
                down”.
              </li>
              <li>
                Keyboard shortcut <kbd class="ui-kbd">G</kbd>{{ " "
                }}<kbd class="ui-kbd">R</kbd> to jump to the Groove Room.
              </li>
            </ul>
          </div>
          <div class="ui-layout-column ui-gap-small changelog-group">
            <h3 class="ui-h6 ui-layout-row ui-gap-small">
              <span class="ui-swatch ui-info"></span>Improved
            </h3>
            <ul>
              <li>Walls with 5&nbsp;000+ shoutouts load in under a second.</li>
              <li>Cleaner profile sidebar with a collapsible gear list.</li>
            </ul>
          </div>
          <Callout severity="warning">
            <CalloutIcon />
            <CalloutContent>
              <p>
                Bummer: the old Guestbook is retiring and goes quiet on
                <time datetime="2027-03-31">March 31, 2027</time>.
                <a class="ui-link" href="#changelog-guestbook"
                  >Save your guestbook entries</a
                >.
              </p>
            </CalloutContent>
          </Callout>
        </div>
      </TimelineItem>
      <TimelineItem datetime="2026-09-12" time="Sep 12, 2026">
        <div class="ui-layout-column">
          <div class="ui-layout-row ui-gap-small">
            <h2 class="ui-h4" id="changelog-5-8">Polls and profile themes</h2>
            <Chip as="span" label="v5.8.0" size="small" variant="outlined" />
          </div>
          <p>
            Ask your friends anything (flatwounds or roundwounds?) and dress up
            your profile with a theme as loud as your low B.
          </p>
          <div class="ui-layout-column ui-gap-small changelog-group">
            <h3 class="ui-h6 ui-layout-row ui-gap-small">
              <span class="ui-swatch ui-success"></span>Added
            </h3>
            <ul>
              <li>
                Polls with up to 8 answers. Yes, “root notes only” counts.
              </li>
              <li>Profile themes, from Midnight Fretless to Hot Pink Slap.</li>
            </ul>
          </div>
          <div class="ui-layout-column ui-gap-small changelog-group">
            <h3 class="ui-h6 ui-layout-row ui-gap-small">
              <span class="ui-swatch ui-warning"></span>Fixed
            </h3>
            <ul>
              <li>Gig dates showed in UTC instead of your local time zone.</li>
              <li>Shoutouts on mobile didn't ping the bassist (classic).</li>
            </ul>
          </div>
        </div>
      </TimelineItem>
      <TimelineItem datetime="2026-08-28" time="Aug 28, 2026">
        <div class="ui-layout-column">
          <div class="ui-layout-row ui-gap-small">
            <h2 class="ui-h4" id="changelog-5-7-2">Bug fixes</h2>
            <Chip as="span" label="v5.7.2" size="small" variant="outlined" />
          </div>
          <div class="ui-layout-column ui-gap-small changelog-group">
            <h3 class="ui-h6 ui-layout-row ui-gap-small">
              <span class="ui-swatch ui-warning"></span>Fixed
            </h3>
            <ul>
              <li>Band photos skipped the pics tagged with the bassist.</li>
              <li>Your now-playing status posted every song twice.</li>
              <li>Dark mode contrast of names on the friends list.</li>
            </ul>
          </div>
        </div>
      </TimelineItem>
    </Timeline>
    <Button class="changelog-more" href="#changelog-archive" variant="outlined">
      Even older news
    </Button>
  </div>
</template>

<style>
.changelog {
  container-type: inline-size;

  .changelog-header .ui-hgroup {
    flex: 1 1 24rem;
  }

  .changelog-cover {
    aspect-ratio: 3 / 1;
    background-image: linear-gradient(
      135deg,
      var(--ui-primary),
      oklch(from var(--ui-primary) l c calc(h + 60))
    );
    border-radius: var(--ui-radius);
  }

  .changelog-group ul {
    display: grid;
    gap: var(--ui-space-1);
    list-style-type: disc;
    padding-inline-start: var(--ui-space-5);
  }

  .changelog-more {
    align-self: center;
  }
}
</style>
