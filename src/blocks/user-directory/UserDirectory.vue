<script setup lang="ts">
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  TextField,
  ToggleButton,
  ToggleGroup,
} from "opui-css/vue"
</script>

<template>
  <div
    class="user-directory ui-layout-container ui-layout-column ui-large"
    style="--_max-inline-size: 80rem"
  >
    <div class="ui-layout-row ui-spread">
      <hgroup class="ui-hgroup">
        <p>Bassbook</p>
        <h1 class="ui-h3">Find bassists</h1>
        <p>48 bassists in 6 cities. Nobody's watching them.</p>
      </hgroup>
      <Button type="button" variant="filled">
        <svg
          data-icon="person-add"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m-9-2V7H4v3H1v2h3v3h2v-3h3v-2zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
          ></path></svg
        ><span class="ui-text">Invite a bassist</span>
      </Button>
    </div>
    <component
      is="search"
      class="ui-layout-row ui-spread user-directory-filters"
    >
      <TextField for="user-directory-q" hideLabel label="Search bassists">
        <input
          aria-describedby="user-directory-q-start"
          id="user-directory-q"
          name="q"
          placeholder="Search by name, gear or city"
          type="search"
        />
        <template #start>
          <svg
            data-icon="search"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
            ></path>
          </svg>
        </template>
      </TextField>
      <ToggleGroup
        aria-label="Bass type"
        name="user-directory-department"
        overflow="scroll"
      >
        <ToggleButton checked value="all">All</ToggleButton>
        <ToggleButton value="four-string">4-string</ToggleButton>
        <ToggleButton value="five-string">5-string</ToggleButton>
        <ToggleButton value="fretless">Fretless</ToggleButton>
        <ToggleButton value="upright">Upright</ToggleButton>
      </ToggleGroup>
    </component>
    <ul
      class="ui-layout-grid user-directory-list"
      style="--_min-inline-size: 17rem"
    >
      <li>
        <Card variant="outlined">
          <CardContent>
            <div class="ui-layout-media">
              <Avatar aria-hidden="true">ER</Avatar>
              <hgroup>
                <h2 class="ui-h6">Elmo Rumble</h2>
                <p>Upright wrangler, jazz only</p>
              </hgroup>
            </div>
            <div class="ui-layout-row ui-small ui-caption">
              <Chip as="span" label="Upright" size="small" />
              <span>Berlin, 14:20 local time</span>
            </div>
          </CardContent>
          <CardActions>
            <Button
              href="#user-directory-elmo-email"
              size="small"
              variant="outlined"
              >Email</Button
            >
            <Button href="#user-directory-elmo-chat" size="small"
              >Message</Button
            >
            <Button
              aria-label="Call Elmo"
              href="#user-directory-elmo-call"
              round
              size="small"
              ><svg
                data-icon="phone"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"
                ></path></svg
            ></Button>
          </CardActions>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <div class="ui-layout-media">
              <Badge
                aria-hidden="true"
                color="success"
                corner="end-end"
                dot
                label="Online"
              >
                <Avatar>HH</Avatar>
              </Badge>
              <hgroup>
                <h2 class="ui-h6">Holly Humbucker</h2>
                <p>Slap enthusiast<span class="ui-sr-only">, online</span></p>
              </hgroup>
            </div>
            <div class="ui-layout-row ui-small ui-caption">
              <Chip as="span" label="5-string" size="small" />
              <span>Accra, 12:20 local time</span>
            </div>
          </CardContent>
          <CardActions>
            <Button
              href="#user-directory-holly-email"
              size="small"
              variant="outlined"
              >Email</Button
            >
            <Button href="#user-directory-holly-chat" size="small"
              >Message</Button
            >
            <Button
              aria-label="Call Holly"
              href="#user-directory-holly-call"
              round
              size="small"
              ><svg
                data-icon="phone"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"
                ></path></svg
            ></Button>
          </CardActions>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <div class="ui-layout-media">
              <Badge
                aria-hidden="true"
                color="success"
                corner="end-end"
                dot
                label="Online"
              >
                <Avatar>IH</Avatar>
              </Badge>
              <hgroup>
                <h2 class="ui-h6">Ines Hertz</h2>
                <p>Root note purist<span class="ui-sr-only">, online</span></p>
              </hgroup>
            </div>
            <div class="ui-layout-row ui-small ui-caption">
              <Chip as="span" label="Upright" size="small" />
              <span>Copenhagen, 14:20 local time</span>
            </div>
          </CardContent>
          <CardActions>
            <Button
              href="#user-directory-ines-email"
              size="small"
              variant="outlined"
              >Email</Button
            >
            <Button href="#user-directory-ines-chat" size="small"
              >Message</Button
            >
            <Button
              aria-label="Call Ines"
              href="#user-directory-ines-call"
              round
              size="small"
              ><svg
                data-icon="phone"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"
                ></path></svg
            ></Button>
          </CardActions>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <div class="ui-layout-media">
              <Badge
                aria-hidden="true"
                color="success"
                corner="end-end"
                dot
                label="Online"
              >
                <Avatar>LH</Avatar>
              </Badge>
              <hgroup>
                <h2 class="ui-h6">Lou Headstock</h2>
                <p>
                  Not the tall guitarist<span class="ui-sr-only">, online</span>
                </p>
              </hgroup>
            </div>
            <div class="ui-layout-row ui-small ui-caption">
              <Chip as="span" label="4-string" size="small" />
              <span>Amsterdam, 14:20 local time</span>
            </div>
          </CardContent>
          <CardActions>
            <Button
              href="#user-directory-lou-email"
              size="small"
              variant="outlined"
              >Email</Button
            >
            <Button href="#user-directory-lou-chat" size="small"
              >Message</Button
            >
            <Button
              aria-label="Call Lou"
              href="#user-directory-lou-call"
              round
              size="small"
              ><svg
                data-icon="phone"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"
                ></path></svg
            ></Button>
          </CardActions>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <div class="ui-layout-media">
              <Avatar aria-hidden="true">PG</Avatar>
              <hgroup>
                <h2 class="ui-h6">Percy Groove</h2>
                <p>Fretless and fearless</p>
              </hgroup>
            </div>
            <div class="ui-layout-row ui-small ui-caption">
              <Chip as="span" label="Fretless" size="small" />
              <span>Oslo, 14:20 local time</span>
            </div>
          </CardContent>
          <CardActions>
            <Button
              href="#user-directory-percy-email"
              size="small"
              variant="outlined"
              >Email</Button
            >
            <Button href="#user-directory-percy-chat" size="small"
              >Message</Button
            >
            <Button
              aria-label="Call Percy"
              href="#user-directory-percy-call"
              round
              size="small"
              ><svg
                data-icon="phone"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"
                ></path></svg
            ></Button>
          </CardActions>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <div class="ui-layout-media">
              <Badge
                aria-hidden="true"
                color="success"
                corner="end-end"
                dot
                label="Online"
              >
                <Avatar>RR</Avatar>
              </Badge>
              <hgroup>
                <h2 class="ui-h6">Rory Rootnote</h2>
                <p>Flatwound fanatic<span class="ui-sr-only">, online</span></p>
              </hgroup>
            </div>
            <div class="ui-layout-row ui-small ui-caption">
              <Chip as="span" label="4-string" size="small" />
              <span>Stockholm, 14:20 local time</span>
            </div>
          </CardContent>
          <CardActions>
            <Button
              href="#user-directory-rory-email"
              size="small"
              variant="outlined"
              >Email</Button
            >
            <Button href="#user-directory-rory-chat" size="small"
              >Message</Button
            >
            <Button
              aria-label="Call Rory"
              href="#user-directory-rory-call"
              round
              size="small"
              ><svg
                data-icon="phone"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"
                ></path></svg
            ></Button>
          </CardActions>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <div class="ui-layout-media">
              <Avatar aria-hidden="true">SN</Avatar>
              <hgroup>
                <h2 class="ui-h6">Stella Nut</h2>
                <p>Low B believer</p>
              </hgroup>
            </div>
            <div class="ui-layout-row ui-small ui-caption">
              <Chip as="span" label="5-string" size="small" />
              <span>Bengaluru, 17:50 local time</span>
            </div>
          </CardContent>
          <CardActions>
            <Button
              href="#user-directory-stella-email"
              size="small"
              variant="outlined"
              >Email</Button
            >
            <Button href="#user-directory-stella-chat" size="small"
              >Message</Button
            >
            <Button
              aria-label="Call Stella"
              href="#user-directory-stella-call"
              round
              size="small"
              ><svg
                data-icon="phone"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"
                ></path></svg
            ></Button>
          </CardActions>
        </Card>
      </li>
      <li>
        <Card variant="outlined">
          <CardContent>
            <div class="ui-layout-media">
              <Avatar aria-hidden="true">TO</Avatar>
              <hgroup>
                <h2 class="ui-h6">Theo Octave</h2>
                <p>Pedalboard hoarder</p>
              </hgroup>
            </div>
            <div class="ui-layout-row ui-small ui-caption">
              <Chip as="span" label="5-string" size="small" />
              <span>Madrid, 14:20 local time</span>
            </div>
          </CardContent>
          <CardActions>
            <Button
              href="#user-directory-theo-email"
              size="small"
              variant="outlined"
              >Email</Button
            >
            <Button href="#user-directory-theo-chat" size="small"
              >Message</Button
            >
            <Button
              aria-label="Call Theo"
              href="#user-directory-theo-call"
              round
              size="small"
              ><svg
                data-icon="phone"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"
                ></path></svg
            ></Button>
          </CardActions>
        </Card>
      </li>
    </ul>
    <div class="ui-layout-column ui-small user-directory-footer">
      <p>Showing 8 of 48 bassists</p>
      <Button type="button" variant="outlined">Load more</Button>
    </div>
  </div>
</template>

<style>
.user-directory {
  .user-directory-filters .ui-text-field {
    flex: 1 1 16rem;
    max-inline-size: 28rem;
  }

  .user-directory-list > li {
    display: grid;
  }

  .user-directory-footer {
    align-items: center;
  }
}
</style>
