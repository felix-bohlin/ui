<script setup lang="ts">
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardContent,
  Chip,
  Field,
} from "opui-css/vue"
</script>

<template>
  <div
    class="empty-states ui-layout-container ui-layout-column ui-gap-large"
    style="--_max-inline-size: 64rem"
  >
    <hgroup class="ui-hgroup empty-states-header">
      <h1 class="ui-h3">Nothing here, yet!</h1>
      <p>
        Every empty page says why it's empty and what to do next. Easy peasy!
      </p>
    </hgroup>
    <div
      class="ui-layout-grid ui-gap-large"
      style="--_max-columns: 2; --_min-inline-size: 19rem"
    >
      <Card
        aria-labelledby="empty-states-first-run"
        as="section"
        variant="outlined"
      >
        <CardContent>
          <Avatar aria-hidden="true" shape="squircle"
            ><svg
              data-icon="folder"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8z"
              ></path></svg
          ></Avatar>
          <hgroup>
            <h2 class="ui-h5" id="empty-states-first-run">
              Nobody has listened yet
            </h2>
            <p>Upload your first bass line and make the windows rattle.</p>
          </hgroup>
          <div class="ui-layout-row ui-gap-small ui-align-center">
            <Button type="button" variant="filled">
              <svg
                data-icon="add"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                ></path></svg
              ><span class="ui-text">New track</span>
            </Button>
            <Button type="button" variant="outlined">
              <svg
                data-icon="cloud-upload"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96M14 13v4h-4v-4H7l5-5 5 5z"
                ></path></svg
              ><span class="ui-text">Upload MP3</span>
            </Button>
          </div>
          <p>
            New here?
            <a class="ui-link" href="#empty-states-tour"
              >Take the 2-minute tour</a
            >
          </p>
        </CardContent>
      </Card>
      <Card
        aria-labelledby="empty-states-no-results"
        as="section"
        variant="outlined"
      >
        <CardContent>
          <Field
            class="empty-states-search"
            for="empty-states-q"
            hideLabel
            label="Search Bassbook"
          >
            <input
              id="empty-states-q"
              name="q"
              type="search"
              :value.attr="'flatwond strings'"
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
          </Field>
          <hgroup>
            <h2 class="ui-h5" id="empty-states-no-results">
              No results for “flatwond strings”
            </h2>
            <p>Whoops! Check the spelling, or try one of these instead.</p>
          </hgroup>
          <div class="ui-layout-row ui-gap-small ui-align-center">
            <Chip
              href="#empty-states-flatwound"
              label="flatwound strings"
              variant="outlined"
            />
            <Chip
              href="#empty-states-drop-d"
              label="Drop D"
              variant="outlined"
            />
            <Chip
              href="#empty-states-fretless"
              label="Fretless"
              variant="outlined"
            />
          </div>
          <Button type="button">Clear search</Button>
        </CardContent>
      </Card>
      <Card
        aria-labelledby="empty-states-inbox"
        as="section"
        variant="outlined"
      >
        <CardContent>
          <Avatar aria-hidden="true" shape="squircle"
            ><svg
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
          ></Avatar>
          <hgroup>
            <h2 class="ui-h5" id="empty-states-inbox">You're all caught up!</h2>
            <p>No new scribbles since 09:12. Enjoy the quiet, for once.</p>
          </hgroup>
          <div class="ui-layout-row ui-gap-small ui-align-center">
            <Button href="#empty-states-archive" variant="outlined"
              >Old scribbles</Button
            >
            <Button href="#empty-states-notification-settings"
              >Notification settings</Button
            >
          </div>
        </CardContent>
      </Card>
      <Card
        aria-labelledby="empty-states-permission"
        as="section"
        variant="outlined"
      >
        <CardContent>
          <Avatar aria-hidden="true" shape="squircle"
            ><svg
              data-icon="lock"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z"
              ></path></svg
          ></Avatar>
          <hgroup>
            <h2 class="ui-h5" id="empty-states-permission">
              You can't see the gig calendar
            </h2>
            <p>Ask a band admin to let you in. Yes, there's a gig. Surprise!</p>
          </hgroup>
          <div class="ui-layout-row ui-gap-small ui-align-center">
            <AvatarGroup aria-label="Band admins">
              <Avatar aria-label="Holly Humbucker" role="img">HH</Avatar>
              <Avatar aria-label="Reggie Riff" role="img">RR</Avatar>
              <Avatar aria-label="Stella Nut" role="img">SN</Avatar>
            </AvatarGroup>
            <span>3 band admins</span>
          </div>
          <div class="ui-layout-row ui-gap-small ui-align-center">
            <Button type="button" variant="filled">Request access</Button>
            <Button href="#empty-states-home">Back to my wall</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style>
.empty-states {
  .empty-states-header {
    align-self: center;
    text-align: center;
  }

  .ui-card > .ui-content {
    align-content: center;
    block-size: 100%;
    display: grid;
    gap: var(--ui-space-4);
    justify-items: center;
    padding-block: var(--ui-space-7);
    text-align: center;
  }

  .ui-card hgroup {
    max-inline-size: 32ch;
  }

  .empty-states-search {
    inline-size: min(100%, 20rem);
  }
}
</style>
