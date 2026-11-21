<script lang="ts">
  import {
    Avatar,
    Badge,
    Button,
    Card,
    CardContent,
    CheckboxInput,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    Field,
    List,
    ListItem,
    Menu,
    Stat,
  } from "opui-css/svelte"
</script>

<div class="app-shell">
  <header class="shell-header ui-layout-row ui-small">
    <Button
      aria-label="Open navigation"
      class="shell-menu-button"
      command="show-modal"
      commandfor="app-shell-drawer"
      round
      size="small"
      type="button"
    >
      <svg
        data-icon="menu"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
        ></path>
      </svg>
    </Button>
    <a class="shell-brand ui-layout-row ui-small" href="#app-shell-home">
      <svg
        data-icon="box"
        aria-hidden="true"
        class="ui-icon ui-large"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2 3 7v10l9 5 9-5V7zm0 2.3 6.6 3.7L12 11.7 5.4 8zM5 9.7l6 3.4v6.6l-6-3.4zm8 10v-6.6l6-3.4v6.6z"
        ></path>
      </svg>
      Bassbook
    </a>
    <Field class="shell-search" for="app-shell-search" size="small">
      <input
        aria-describedby="app-shell-search-start"
        aria-label="Search"
        id="app-shell-search"
        name="app-shell-search"
        placeholder="Search bassists and bands"
        type="search"
      />
      {#snippet start()}
        <svg
          data-icon="search"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
          ></path>
        </svg>
      {/snippet}
    </Field>
    <Button
      aria-label="Notifications, 3 unread"
      round
      size="small"
      type="button"
    >
      <Badge dot label="Unread"
        ><svg
          data-icon="bell"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"
          ></path>
        </svg></Badge
      >
    </Button>
    <Avatar
      as="button"
      command="toggle-popover"
      commandfor="app-shell-account"
      label="Account menu for Rory Rootnote"
      type="button"
    >
      RR
    </Avatar>
    <Menu align="end" id="app-shell-account">
      <li class="ui-heading">rory@lowend.example</li>
      <ListItem href="#app-shell-profile" label="Profile" />
      <ListItem href="#app-shell-settings" label="Settings" />
      <ListItem
        as="button"
        borderTop
        command="hide-popover"
        commandfor="app-shell-account"
        label="Sign out"
        type="button"
      />
    </Menu>
  </header>
  <div class="ui-layout-columns" style="--_columns: 15rem 1fr; --_gap: 0">
    <nav aria-label="Main" class="shell-sidebar">
      <List dense variant="transparent">
        <ListItem aria-current="page" href="#app-shell-home" label="Home">
          {#snippet start()}
            <svg
              data-icon="home"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
              ></path>
            </svg>
          {/snippet}
        </ListItem>
        <ListItem href="#app-shell-messages" label="Messages">
          {#snippet start()}
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
                d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 12h-4a3 3 0 0 1-6 0H5V5h14z"
              ></path>
            </svg>
          {/snippet}

          {#snippet end()}4{/snippet}
        </ListItem>
        <ListItem href="#app-shell-photos" label="Photos">
          {#snippet start()}
            <svg
              data-icon="folder"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"
              ></path>
            </svg>
          {/snippet}
        </ListItem>
        <ListItem href="#app-shell-gigs" label="Gigs">
          {#snippet start()}
            <svg
              data-icon="calendar"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 16H5V10h14z"
              ></path>
            </svg>
          {/snippet}
        </ListItem>
        <ListItem href="#app-shell-leaderboard" label="Leaderboard">
          {#snippet start()}
            <svg
              data-icon="chart"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm2 12a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0zm4-4a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0zm4-4a1 1 0 1 1 2 0v10a1 1 0 1 1-2 0z"
              ></path>
            </svg>
          {/snippet}
        </ListItem>
      </List>
      <p class="ui-overline shell-nav-label" id="app-shell-groups-label">
        My groups
      </p>
      <List
        aria-labelledby="app-shell-groups-label"
        dense
        variant="transparent"
      >
        <ListItem href="#app-shell-low-end-theory" label="Low End Theory">
          {#snippet start()}
            <span class="ui-swatch ui-info"></span>
          {/snippet}
        </ListItem>
        <ListItem
          href="#app-shell-ignored-bassists"
          label="Ignored Bassists Anon."
        >
          {#snippet start()}
            <span class="ui-swatch ui-warning"></span>
          {/snippet}
        </ListItem>
        <ListItem href="#app-shell-gear-talk" label="Gear Talk">
          {#snippet start()}
            <span class="ui-swatch ui-success"></span>
          {/snippet}
        </ListItem>
      </List>
    </nav>
    <main class="ui-layout-column ui-large">
      <div class="ui-layout-row ui-spread">
        <hgroup class="ui-hgroup">
          <p>Wednesday, 8 October</p>
          <h1 class="ui-h3">Heyyy, Rory! :)</h1>
        </hgroup>
        <Button size="small" type="button" variant="filled">
          <svg
            data-icon="add"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
            ></path>
          </svg><span class="ui-text">New post</span>
        </Button>
      </div>
      <ul class="ui-layout-grid ui-stretch" style="--_min-inline-size: 11rem">
        <li>
          <Card variant="outlined">
            <CardContent>
              <Stat
                description="3 from drummers (suspicious)"
                label="Friend requests">12</Stat
              >
            </CardContent>
          </Card>
        </li>
        <li>
          <Card variant="outlined">
            <CardContent>
              <Stat description="You're invited to both!" label="Gigs this week"
                >2</Stat
              >
            </CardContent>
          </Card>
        </li>
        <li>
          <Card variant="outlined">
            <CardContent>
              <Stat
                description="Up from 29 in September"
                label="Shoutouts in October">38</Stat
              >
            </CardContent>
          </Card>
        </li>
      </ul>
      <div
        class="ui-layout-columns ui-large ui-breakpoint-large"
        style="--_columns: 3fr 2fr"
      >
        <Card
          aria-labelledby="app-shell-upcoming-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 class="ui-h5" id="app-shell-upcoming-heading">To-do list</h2>
            <p>Stuff to do before the next gig.</p>
          </hgroup>
          <List variant="transparent">
            <ListItem
              choice="checkbox"
              description="Gear Talk, due today"
              for="app-shell-task-1"
              label="Restring the 5-string with flatwounds"
            >
              {#snippet end()}
                <CheckboxInput id="app-shell-task-1" />
              {/snippet}
            </ListItem>
            <ListItem
              choice="checkbox"
              description="Low End Theory, due Fri 10 Oct"
              for="app-shell-task-2"
              label="Learn the slap break for the encore"
            >
              {#snippet end()}
                <CheckboxInput id="app-shell-task-2" />
              {/snippet}
            </ListItem>
            <ListItem
              choice="checkbox"
              description="Ignored Bassists Anon., due Tue 14 Oct"
              for="app-shell-task-3"
              label="Ask if the band has a gig Saturday"
            >
              {#snippet end()}
                <CheckboxInput id="app-shell-task-3" />
              {/snippet}
            </ListItem>
            <ListItem
              choice="checkbox"
              description="Low End Theory, due Thu 16 Oct"
              for="app-shell-task-4"
              label="Practice my “turn it down” face"
            >
              {#snippet end()}
                <CheckboxInput id="app-shell-task-4" />
              {/snippet}
            </ListItem>
          </List>
        </Card>
        <Card
          aria-labelledby="app-shell-activity-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 class="ui-h5" id="app-shell-activity-heading">The Wall</h2>
            <p>What your bass buddies did today.</p>
          </hgroup>
          <List variant="transparent">
            <ListItem
              description="Gear Talk, 09:42"
              label="Percy posted “Rate my pedalboard!!”"
            >
              {#snippet start()}
                <Avatar aria-label="Percy Groove" role="img">PG</Avatar>
              {/snippet}
            </ListItem>
            <ListItem
              description="Low End Theory, 08:15"
              label="Stella commented on “Drop D or bust”"
            >
              {#snippet start()}
                <Avatar aria-label="Stella Nut" role="img">SN</Avatar>
              {/snippet}
            </ListItem>
            <ListItem
              description="Ignored Bassists Anon., 07:58"
              label="Ines uploaded 12 gig photos"
            >
              {#snippet start()}
                <Avatar aria-label="Ines Hertz" role="img">IH</Avatar>
              {/snippet}
            </ListItem>
          </List>
        </Card>
      </div>
    </main>
  </div>
  <Drawer id="app-shell-drawer" scrollLock>
    <DrawerHeader closeButton closeLabel="Close navigation">
      <DrawerTitle>Bassbook</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <nav aria-label="Main">
        <List variant="transparent">
          <ListItem aria-current="page" href="#app-shell-home" label="Home" />
          <ListItem href="#app-shell-messages" label="Messages">
            {#snippet end()}4{/snippet}
          </ListItem>
          <ListItem href="#app-shell-photos" label="Photos" />
          <ListItem href="#app-shell-gigs" label="Gigs" />
          <ListItem href="#app-shell-leaderboard" label="Leaderboard" />
        </List>
      </nav>
    </DrawerContent>
  </Drawer>
</div>

<style>
  :global {
    .app-shell {
      container-type: inline-size;

      .shell-header {
        border-block-end: var(--ui-border-width) solid var(--ui-border-color);
        padding: var(--ui-space-2) var(--ui-space-3);
      }

      .shell-menu-button {
        @container (inline-size >= 56rem) {
          display: none;
        }
      }

      .shell-brand {
        color: var(--ui-text-strong);
        font-weight: var(--ui-font-weight-bold);
        margin-inline-end: auto;
        text-decoration: none;

        svg {
          color: var(--ui-primary);
        }
      }

      .shell-search {
        display: none;
        inline-size: 18rem;

        @container (inline-size >= 40rem) {
          display: block;
        }
      }

      .shell-sidebar {
        border-inline-end: var(--ui-border-width) solid var(--ui-border-color);
        display: none;
        padding: var(--ui-space-2);

        @container (inline-size >= 56rem) {
          display: block;
        }
      }

      .shell-nav-label {
        padding: var(--ui-space-3) var(--ui-space-3) 0;
      }

      main {
        padding: var(--ui-space-5) var(--ui-space-4);
      }
    }
  }
</style>
