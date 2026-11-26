<script setup lang="ts">
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  Tooltip,
  TooltipContent,
} from "opui-css/vue"
</script>

<template>
  <div
    class="notifications ui-layout-container"
    style="--_max-inline-size: 42rem"
  >
    <Card variant="outlined">
      <CardContent>
        <div class="ui-layout-row ui-gap-small ui-spread">
          <h1 class="ui-h4">Notifications</h1>
          <div class="ui-layout-row ui-gap-x-small">
            <Button size="small" type="button">
              <svg
                data-icon="check-all"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12zM.41 13.41 6 19l1.41-1.41L1.83 12z"
                ></path></svg
              ><span class="ui-text">Mark all as read</span>
            </Button>
            <Tooltip id="notifications-settings-tip">
              <Button
                aria-label="Notification settings"
                href="#notifications-settings"
                interestfor="notifications-settings-tip"
                round
                size="small"
                ><svg
                  data-icon="settings"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6"
                  ></path></svg
              ></Button>
              <TooltipContent>Pick what gets a ping</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <Tabs name="notifications-tabs">
          <TabsItem checked id="notifications-tab-all">
            <TabsLabel>All</TabsLabel>
            <TabsPanel>
              <div class="ui-layout-column ui-gap-large notifications-feed">
                <section
                  aria-labelledby="notifications-today"
                  class="ui-layout-column ui-gap-small"
                >
                  <h2 class="ui-overline" id="notifications-today">Today</h2>
                  <List flush variant="transparent">
                    <ListItem
                      class="notifications-unread"
                      label="Holly Humbucker mentioned you in Gear Talk 🎸"
                    >
                      <template #start>
                        <Badge dot label="Unread"
                          ><Avatar aria-hidden="true">HH</Avatar></Badge
                        >
                      </template>
                      <p class="notifications-quote">
                        @rory is it true you can play a whole set on 3 strings?
                        asking for a guitarist
                      </p>
                      <div
                        class="ui-layout-row ui-gap-small notifications-actions"
                      >
                        <Button size="small" type="button" variant="tonal"
                          >Reply</Button
                        >
                        <Button size="small" type="button">Mark as read</Button>
                      </div>
                      <template #end>
                        <time class="ui-caption" datetime="2026-10-08T10:42"
                          >10:42</time
                        >
                      </template>
                    </ListItem>
                    <ListItem
                      class="notifications-unread"
                      description="14 members, including Stella and Percy. Loud ones only!"
                      label="Lou Headstock invited you to the group Bassists Who Were Told To Turn It Down"
                    >
                      <template #start>
                        <Badge dot label="Unread"
                          ><Avatar aria-hidden="true">LH</Avatar></Badge
                        >
                      </template>
                      <div
                        class="ui-layout-row ui-gap-small notifications-actions"
                      >
                        <Button size="small" type="button" variant="filled"
                          >Accept</Button
                        >
                        <Button size="small" type="button" variant="outlined"
                          >Decline</Button
                        >
                      </div>
                      <template #end>
                        <time class="ui-caption" datetime="2026-10-08T09:15"
                          >09:15</time
                        >
                      </template>
                    </ListItem>
                    <ListItem label="Holly Humbucker scribbled on your wall">
                      <template #start>
                        <Avatar aria-hidden="true">HH</Avatar>
                      </template>
                      <p>
                        "Saw your gig!! I was the only one watching your fingers
                        &lt;3"
                      </p>
                      <template #end>
                        <time class="ui-caption" datetime="2026-10-08T08:03"
                          >08:03</time
                        >
                      </template>
                    </ListItem>
                  </List>
                </section>
                <section
                  aria-labelledby="notifications-yesterday"
                  class="ui-layout-column ui-gap-small"
                >
                  <h2 class="ui-overline" id="notifications-yesterday">
                    Yesterday
                  </h2>
                  <List flush variant="transparent">
                    <ListItem>
                      <template #start>
                        <Avatar aria-hidden="true">PG</Avatar>
                      </template>
                      <template #label
                        >Percy Groove commented on your photo "Me and Big
                        Bertha"</template
                      >
                      <p class="notifications-quote">
                        That fretboard tho 😍 Is she a '74?
                      </p>
                      <template #end>
                        <time class="ui-caption" datetime="2026-10-07T16:20"
                          >16:20</time
                        >
                      </template>
                    </ListItem>
                    <ListItem label="Ines Hertz reacted 🔥 to your post">
                      <template #start>
                        <Avatar aria-hidden="true">IH</Avatar>
                      </template>
                      <p>
                        "My drummer asked if bass is just a guitar with fewer
                        strings"
                      </p>
                      <template #end>
                        <time class="ui-caption" datetime="2026-10-07T11:05"
                          >11:05</time
                        >
                      </template>
                    </ListItem>
                  </List>
                </section>
                <section
                  aria-labelledby="notifications-earlier"
                  class="ui-layout-column ui-gap-small"
                >
                  <h2 class="ui-overline" id="notifications-earlier">
                    Monday 5 October
                  </h2>
                  <List flush variant="transparent">
                    <ListItem
                      description="Renew it to keep your shiny gold name and the extra-low frequencies!"
                      label="Bassbook Gold: your membership runs out next month"
                    >
                      <template #start>
                        <Avatar aria-hidden="true" shape="squircle">BB</Avatar>
                      </template>
                      <div
                        class="ui-layout-row ui-gap-small notifications-actions"
                      >
                        <Button
                          href="#notifications-gold"
                          size="small"
                          variant="outlined"
                          >Renew Gold</Button
                        >
                      </div>
                      <template #end>
                        <time class="ui-caption" datetime="2026-10-05T07:30"
                          >07:30</time
                        >
                      </template>
                    </ListItem>
                  </List>
                </section>
              </div></TabsPanel
            >
          </TabsItem>
          <TabsItem id="notifications-tab-mentions">
            <TabsLabel>Mentions</TabsLabel>
            <TabsPanel>
              <div class="ui-layout-column ui-gap-large notifications-feed">
                <List flush variant="transparent">
                  <ListItem class="notifications-unread">
                    <template #start>
                      <Avatar aria-hidden="true">HH</Avatar>
                    </template>
                    <template #label>
                      <span class="ui-sr-only">Unread: </span>Holly Humbucker
                      mentioned you in Gear Talk 🎸</template
                    >
                    <p class="notifications-quote">
                      @rory is it true you can play a whole set on 3 strings?
                      asking for a guitarist
                    </p>
                    <template #end>
                      <time class="ui-caption" datetime="2026-10-08T10:42"
                        >10:42</time
                      >
                    </template>
                  </ListItem>
                  <ListItem label="Stella Nut mentioned you in Mixed Too Low">
                    <template #start>
                      <Avatar aria-hidden="true">SN</Avatar>
                    </template>
                    <p class="notifications-quote">
                      @rory is our hero. A bass solo. At a WEDDING!!
                    </p>
                    <template #end>
                      <time class="ui-caption" datetime="2026-10-06T14:48"
                        >Tue</time
                      >
                    </template>
                  </ListItem>
                </List>
              </div></TabsPanel
            >
          </TabsItem>
          <TabsItem id="notifications-tab-archived">
            <TabsLabel>Archived</TabsLabel>
            <TabsPanel>
              <div
                class="ui-layout-column ui-gap-small ui-align-center notifications-empty"
              >
                <svg
                  data-icon="inbox"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2m0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19z"
                  ></path>
                </svg>
                <p>Nothing archived yet. Squeaky clean!</p>
              </div></TabsPanel
            >
          </TabsItem>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>

<style>
.notifications {
  .notifications-feed {
    padding-block-start: var(--ui-space-3);
  }

  .notifications-unread .ui-text > p:first-child {
    font-weight: var(--ui-font-weight-semibold);
  }

  .notifications-quote {
    border-inline-start: var(--ui-border-width) solid var(--ui-border-color);
    padding-inline-start: var(--ui-space-2);
  }

  .notifications-actions {
    padding-block-start: var(--ui-space-2);
  }

  time {
    white-space: nowrap;
  }

  .notifications-empty {
    padding-block: var(--ui-space-8);
  }
}
</style>
