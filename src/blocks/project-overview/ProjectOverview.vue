<script setup lang="ts">
import {
  Avatar,
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  Card,
  CardActions,
  CardContent,
  Chip,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
  List,
  ListItem,
  Menu,
  Progress,
  Stat,
  Timeline,
  TimelineItem,
} from "opui-css/vue"
</script>

<template>
  <div
    class="project-overview ui-layout-container ui-layout-column ui-large"
    style="--_max-inline-size: 80rem"
  >
    <div class="ui-layout-row ui-spread">
      <hgroup class="ui-hgroup">
        <p>Bassbook, community meetup</p>
        <h1 class="ui-h3">Bass Day 2026</h1>
        <p>
          <Chip
            as="span"
            dot
            label="On track"
            severity="success"
            size="small"
            variant="outlined"
          />
        </p>
      </hgroup>
      <div class="ui-layout-row ui-small">
        <Button size="small" type="button" variant="outlined">Share</Button>
        <Button
          command="toggle-popover"
          commandfor="project-overview-actions"
          size="small"
          type="button"
          variant="filled"
        >
          <span class="ui-text">Actions</span>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"
            ></path>
          </svg>
        </Button>
        <Menu
          align="end"
          id="project-overview-actions"
          :items="[
            { label: 'Edit details' },
            { label: 'Add milestone' },
            { label: 'Export report' },
            { borderTop: true, color: 'critical', label: 'Archive meetup' },
          ]"
        />
      </div>
    </div>
    <Callout severity="warning"
      ><CalloutIcon /><CalloutContent>
        <p>
          The big jam rehearsal moved from 10 to 14 October.
          <a class="ui-link" href="#project-overview-jam">See what changed</a>
        </p>
      </CalloutContent></Callout
    >
    <ul class="ui-layout-grid ui-stretch" style="--_min-inline-size: 13rem">
      <li>
        <Card variant="outlined"
          ><CardContent>
            <Stat>
              <template #label>
                <span id="project-overview-progress-label">Progress</span>
              </template>
              64%</Stat
            >
            <Progress
              aria-labelledby="project-overview-progress-label"
              :max="100"
              :value="64"
            /> </CardContent
        ></Card>
      </li>
      <li>
        <Card variant="outlined"
          ><CardContent>
            <Stat description="11 closed this week" label="Tasks completed"
              >86 of 134</Stat
            >
          </CardContent></Card
        >
      </li>
      <li>
        <Card variant="outlined"
          ><CardContent>
            <Stat description="Bass Day is 31 October" label="Time left"
              >23 days</Stat
            >
          </CardContent></Card
        >
      </li>
      <li>
        <Card variant="outlined"
          ><CardContent>
            <Stat description="69% of 60 000 kr" label="Budget used"
              >41 200 kr</Stat
            >
          </CardContent></Card
        >
      </li>
    </ul>
    <div class="ui-layout-columns ui-large" style="--_columns: 3fr 2fr">
      <div class="ui-layout-column ui-large">
        <Card
          aria-labelledby="project-overview-milestones-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 class="ui-h5" id="project-overview-milestones-heading">
              Milestones
            </h2>
            <p>3 of 5 completed.</p>
          </hgroup>
          <CardContent
            ><Timeline>
              <TimelineItem
                color="success"
                datetime="2026-08-14"
                label="Find a venue with enough outlets"
                time="14 Aug"
              >
                <template #marker>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
                    ></path>
                  </svg>
                </template>
                <p class="ui-caption">Completed, 12 venues visited</p>
              </TimelineItem>
              <TimelineItem
                color="success"
                datetime="2026-09-05"
                label="Book a sound tech who loves bass"
                time="5 Sep"
              >
                <template #marker>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
                    ></path>
                  </svg>
                </template>
                <p class="ui-caption">Completed, low end approved</p>
              </TimelineItem>
              <TimelineItem
                color="success"
                datetime="2026-09-26"
                label="Name tags and goodie bags"
                time="26 Sep"
              >
                <template #marker>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
                    ></path>
                  </svg>
                </template>
                <p class="ui-caption">Completed, two days late</p>
              </TimelineItem>
              <TimelineItem current="step" datetime="2026-10-14" time="14 Oct">
                <template #marker>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m0-14v12a6 6 0 0 0 0-12"
                    ></path>
                  </svg>
                </template>

                <template #label>
                  <span id="project-overview-jam-label">Big jam rehearsal</span>
                </template>
                <p class="ui-caption">In progress, 18 of 26 tasks done</p>
                <Progress
                  aria-labelledby="project-overview-jam-label"
                  :max="26"
                  :value="18"
                />
              </TimelineItem>
              <TimelineItem
                datetime="2026-10-31"
                label="Bass Day, woohoo!"
                time="31 Oct"
              >
                <template #marker>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16"
                    ></path>
                  </svg>
                </template>
                <p class="ui-caption">Upcoming</p>
              </TimelineItem>
            </Timeline></CardContent
          >
        </Card>
        <Card
          aria-labelledby="project-overview-activity-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 class="ui-h5" id="project-overview-activity-heading">
              Recent activity
            </h2>
          </hgroup>
          <List variant="transparent">
            <ListItem
              description="Today, 10:24"
              label="Holly closed “Extension cords for 40 amps”"
            >
              <template #start>
                <Avatar aria-label="Holly Humbucker" role="img">HH</Avatar>
              </template>
            </ListItem>
            <ListItem
              description="Today, 08:51"
              label="Lou uploaded “Bass Day poster v4.png”"
            >
              <template #start>
                <Avatar aria-label="Lou Headstock" role="img">LH</Avatar>
              </template>
            </ListItem>
            <ListItem
              description="Yesterday, 16:02"
              label="Percy moved the jam rehearsal to 14 October"
            >
              <template #start>
                <Avatar aria-label="Percy Groove" role="img">PG</Avatar>
              </template>
            </ListItem>
          </List>
        </Card>
      </div>
      <div class="ui-layout-column ui-large">
        <Card
          aria-labelledby="project-overview-team-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 class="ui-h5" id="project-overview-team-heading">Team</h2>
            <p>5 bassists making it happen.</p>
          </hgroup>
          <List dense variant="transparent">
            <ListItem description="Party boss" label="Percy Groove">
              <template #start>
                <Avatar aria-label="Percy Groove" role="img">PG</Avatar>
              </template>

              <template #end>
                <Chip as="span" label="Owner" size="x-small" />
              </template>
            </ListItem>
            <ListItem description="Poster artist" label="Lou Headstock">
              <template #start>
                <Avatar aria-label="Lou Headstock" role="img">LH</Avatar>
              </template>
            </ListItem>
            <ListItem description="Amp wrangler" label="Holly Humbucker">
              <template #start>
                <Avatar aria-label="Holly Humbucker" role="img">HH</Avatar>
              </template>
            </ListItem>
            <ListItem description="Snack captain" label="Ines Hertz">
              <template #start>
                <Avatar aria-label="Ines Hertz" role="img">IH</Avatar>
              </template>
            </ListItem>
            <ListItem description="Sound check hero" label="Rory Rootnote">
              <template #start>
                <Avatar aria-label="Rory Rootnote" role="img">RR</Avatar>
              </template>
            </ListItem>
          </List>
          <CardActions
            ><Button size="small" type="button"
              >Invite people</Button
            ></CardActions
          >
        </Card>
        <Card
          aria-labelledby="project-overview-details-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 class="ui-h5" id="project-overview-details-heading">Details</h2>
          </hgroup>
          <CardContent
            ><DescriptionList border="solid">
              <DescriptionListItem
                ><DescriptionListTerm>Host</DescriptionListTerm
                ><DescriptionListDescription
                  >Low End Theory</DescriptionListDescription
                ></DescriptionListItem
              >
              <DescriptionListItem
                ><DescriptionListTerm>Started</DescriptionListTerm
                ><DescriptionListDescription
                  >4 August 2026</DescriptionListDescription
                ></DescriptionListItem
              >
              <DescriptionListItem
                ><DescriptionListTerm>Bass Day</DescriptionListTerm
                ><DescriptionListDescription
                  >31 October 2026</DescriptionListDescription
                ></DescriptionListItem
              >
              <DescriptionListItem
                ><DescriptionListTerm>Basses</DescriptionListTerm
                ><DescriptionListDescription
                  >4-string, 5-string, fretless</DescriptionListDescription
                ></DescriptionListItem
              >
            </DescriptionList></CardContent
          >
        </Card>
      </div>
    </div>
  </div>
</template>

<style>
.project-overview {
  container-type: inline-size;
}
</style>
