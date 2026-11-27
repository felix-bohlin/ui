<script setup lang="ts">
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
  List,
  ListItem,
  Reactions,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
} from "opui-css/vue"
</script>

<template>
  <div
    class="bassist-profile ui-layout-container ui-layout-column"
    style="--_gap: var(--ui-space-7); --_max-inline-size: 64rem"
  >
    <div aria-hidden="true" class="bp-cover"></div>
    <div class="bp-header ui-layout-row ui-spread">
      <div class="bp-identity ui-layout-row" style="--_gap: var(--ui-space-5)">
        <Avatar
          class="bp-avatar"
          label="Kinga Headstock"
          size="large"
          src="/photos/kinga-headstock.png"
        />
        <hgroup class="ui-hgroup">
          <h1 class="bp-name">Kinga Headstock</h1>
          <p>@flatwoundkinga, Gothenburg</p>
        </hgroup>
      </div>
      <div class="ui-layout-row ui-gap-small">
        <Button href="#bassist-profile-message" variant="outlined"
          >Message</Button
        >
        <Button type="button" variant="filled">Follow</Button>
      </div>
    </div>
    <div
      class="ui-layout-columns"
      style="--_columns: 2fr 3fr; --_gap: var(--ui-space-7)"
    >
      <div class="ui-layout-column" style="--_gap: var(--ui-space-7)">
        <p>
          Fretless on Sundays, five-string the rest of the week. I play in The
          Flatwounds and teach anyone who asks nicely.
        </p>
        <dl class="bp-stats ui-layout-row" style="--_gap: var(--ui-space-7)">
          <div>
            <dt>Followers</dt>
            <dd>2 413</dd>
          </div>
          <div>
            <dt>Following</dt>
            <dd>318</dd>
          </div>
          <div>
            <dt>Gigs</dt>
            <dd>87</dd>
          </div>
        </dl>
        <ul aria-label="Styles" class="ui-layout-row ui-gap-x-small">
          <li><Chip as="span" label="Five-string" size="small" /></li>
          <li><Chip as="span" label="Fretless" size="small" /></li>
          <li><Chip as="span" label="Funk" size="small" /></li>
          <li><Chip as="span" label="Teaches" size="small" /></li>
        </ul>
        <Card
          aria-labelledby="bassist-profile-gear-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 class="ui-h6" id="bassist-profile-gear-heading">Gear</h2>
            <p>What Kinga plays through.</p>
          </hgroup>
          <CardContent>
            <DescriptionList leader="dotted" orientation="horizontal">
              <DescriptionListItem>
                <DescriptionListTerm>Bass</DescriptionListTerm>
                <DescriptionListDescription
                  >Jazz Bass, 1978</DescriptionListDescription
                >
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>Strings</DescriptionListTerm>
                <DescriptionListDescription
                  >Flatwounds, 45 to 105</DescriptionListDescription
                >
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListTerm>Amp</DescriptionListTerm>
                <DescriptionListDescription
                  >Very tall, very loud</DescriptionListDescription
                >
              </DescriptionListItem>
            </DescriptionList>
          </CardContent>
        </Card>
      </div>
      <Tabs name="bassist-profile-tabs" variant="line">
        <TabsItem checked id="bassist-profile-tab-wall">
          <TabsLabel>Wall</TabsLabel>
          <TabsPanel>
            <div class="ui-layout-column" style="--_gap: var(--ui-space-5)">
              <Card as="article" class="bp-post" variant="outlined">
                <CardContent>
                  <div class="ui-layout-media ui-gap-small">
                    <Avatar
                      label="Kinga Headstock"
                      src="/photos/kinga-headstock.png"
                    />
                    <div>
                      <p><strong>Kinga Headstock</strong></p>
                      <p class="ui-caption">
                        <time datetime="2026-11-24T21:40">Monday, 21:40</time>
                      </p>
                    </div>
                  </div>
                  <p>
                    Recorded the new walking line for Root Note Romance in one
                    take. Then I recorded it eleven more times, just to be sure.
                  </p>
                  <div class="bp-attachment ui-layout-media ui-gap-small">
                    <span aria-hidden="true" class="bp-attachment-art"></span>
                    <span class="ui-layout-column ui-gap-x-small">
                      <strong>Root Note Romance, bass only</strong>
                      <span class="ui-caption">2:58</span>
                    </span>
                  </div>
                  <Reactions
                    aria-label="Reactions"
                    id="bassist-profile-reactions-1"
                    :items="[
                      {
                        'aria-label': 'Fire, 24',
                        checked: true,
                        label: '🔥 24',
                        value: 'fire',
                      },
                      {
                        'aria-label': 'Heart, 9',
                        label: '❤️ 9',
                        value: 'heart',
                      },
                    ]"
                    name="bassist-profile-reaction-1"
                  />
                </CardContent>
              </Card>
              <Card as="article" class="bp-post" variant="outlined">
                <CardContent>
                  <div class="ui-layout-media ui-gap-small">
                    <Avatar label="Adam Groove" src="/photos/adam-groove.png" />
                    <div>
                      <p><strong>Adam Groove</strong></p>
                      <p class="ui-caption">
                        <time datetime="2026-11-22T10:05">Saturday, 10:05</time>
                      </p>
                    </div>
                  </div>
                  <p>
                    Kinga taught me the thumb mute in ten minutes. My neighbours
                    would like a word with Kinga.
                  </p>
                  <Reactions
                    aria-label="Reactions"
                    id="bassist-profile-reactions-2"
                    :items="[
                      {
                        'aria-label': 'Laughing, 31',
                        label: '😂 31',
                        value: 'laugh',
                      },
                    ]"
                    name="bassist-profile-reaction-2"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsPanel>
        </TabsItem>
        <TabsItem id="bassist-profile-tab-gigs">
          <TabsLabel>Upcoming gigs</TabsLabel>
          <TabsPanel>
            <List bordered variant="transparent">
              <ListItem description="Café Fretless, Malmö" label="Sunday jam">
                <template #end>
                  <span class="ui-caption">7 Dec</span>
                </template>
              </ListItem>
              <ListItem
                description="The Rehearsal Basement"
                label="Adam's 40th"
              >
                <template #end>
                  <span class="ui-caption">20 Mar</span>
                </template>
              </ListItem>
              <ListItem
                description="Harbour Stage, Gothenburg"
                label="Bassquake Festival"
              >
                <template #end>
                  <span class="ui-caption">12 Jun</span>
                </template>
              </ListItem>
            </List>
          </TabsPanel>
        </TabsItem>
      </Tabs>
    </div>
  </div>
</template>

<style>
.bassist-profile {
  container-type: inline-size;

  .bp-cover {
    aspect-ratio: 4 / 1;
    background-color: oklch(from var(--ui-primary) 0.3 0.08 h);
    background-image:
      radial-gradient(
        ellipse 30% 90% at 20% 0,
        oklch(from var(--ui-primary) 0.85 0.12 calc(h + 60) / 70%),
        transparent
      ),
      radial-gradient(
        ellipse 25% 80% at 55% 0,
        oklch(from var(--ui-primary) 0.8 0.12 calc(h + 180) / 60%),
        transparent
      ),
      radial-gradient(
        ellipse 30% 90% at 85% 0,
        oklch(from var(--ui-primary) 0.85 0.12 calc(h + 300) / 70%),
        transparent
      ),
      linear-gradient(transparent 60%, oklch(0.15 0.02 260 / 60%));
    border-radius: var(--ui-radius);
    min-block-size: 7rem;
  }

  .bp-header {
    align-items: end;
    padding-inline: var(--ui-space-6);
  }

  .bp-identity {
    align-items: end;
  }

  .bp-avatar {
    --_size: 7rem;

    border: var(--ui-border-width-large) solid var(--ui-surface);
    box-shadow: var(--ui-shadow-elevated);
    margin-block-start: calc(-1 * var(--ui-space-12));
  }

  .bp-name {
    color: var(--ui-text-strong);
    font-size: var(--ui-font-size-700);
    line-height: var(--ui-line-height-tight);
  }

  .bp-stats {
    margin: 0;

    div {
      display: grid;
    }

    dt {
      color: var(--ui-text-subtle);
      font-size: var(--ui-font-size-caption);
      order: 2;
    }

    dd {
      color: var(--ui-text-strong);
      font-size: var(--ui-font-size-large);
      font-variant-numeric: tabular-nums;
      font-weight: var(--ui-font-weight-heading);
      margin: 0;
    }
  }

  .bp-post .ui-content {
    display: grid;
    gap: var(--ui-space-5);
  }

  .bp-attachment {
    align-items: center;
    background-color: var(--ui-surface-tonal);
    border-radius: var(--ui-radius);
    padding: var(--ui-space-4);
  }

  .bp-attachment-art {
    aspect-ratio: 1;
    background-color: oklch(0.2 0.01 260);
    background-image:
      radial-gradient(
        circle,
        var(--ui-primary) 0 18%,
        oklch(0.2 0.01 260) 19% 22%,
        transparent 23%
      ),
      repeating-radial-gradient(
        circle,
        transparent 0 3px,
        oklch(1 0 0 / 8%) 3px 4px
      );
    border-radius: var(--ui-radius-small);
    inline-size: 3rem;
  }
}
</style>
