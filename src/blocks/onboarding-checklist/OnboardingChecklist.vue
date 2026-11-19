<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  Button,
  Callout,
  CalloutContent,
  Card,
  CardContent,
  Progress,
} from "opui-css/vue"
</script>

<template>
  <div
    class="onboarding-checklist ui-layout-container"
    style="--_max-inline-size: 40rem"
  >
    <Card
      aria-labelledby="onboarding-checklist-heading"
      as="section"
      variant="outlined"
    >
      <CardContent>
        <div class="ui-layout-row ui-spread onboarding-checklist-head">
          <hgroup>
            <h1 class="ui-h4" id="onboarding-checklist-heading">
              Welcome to Bassbook!
            </h1>
            <p>A few easy peasy steps to get your profile rockin'. Woohoo!</p>
          </hgroup>
          <Button
            aria-label="Dismiss checklist"
            round
            size="small"
            type="button"
          >
            <svg
              data-icon="close"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              ></path>
            </svg>
          </Button>
        </div>
        <div class="ui-layout-column ui-x-small">
          <span
            class="ui-layout-row ui-spread"
            id="onboarding-checklist-progress"
            ><span>3 of 6 steps done</span><span>50%</span></span
          >
          <Progress
            aria-labelledby="onboarding-checklist-progress"
            :max="6"
            :value="3"
          />
        </div>
        <Card aria-label="Steps" role="group" variant="outlined">
          <Accordion name="onboarding-checklist-steps">
            <AccordionSummary>
              <span class="ui-layout-media onboarding-checklist-complete">
                <span
                  aria-hidden="true"
                  class="ui-tabular-nums onboarding-checklist-marker onboarding-checklist-done"
                  >✓</span
                >
                <span
                  >Fill in your profile<span class="ui-sr-only"
                    >, done</span
                  ></span
                >
              </span>
            </AccordionSummary>
            <AccordionContent>
              <p>Your profile bassbook.example/rory is live!</p>
              <div class="ui-layout-row ui-small">
                <Button href="#onboarding-checklist-profile" size="small"
                  >Edit profile</Button
                >
              </div>
            </AccordionContent>
          </Accordion>
          <Accordion name="onboarding-checklist-steps">
            <AccordionSummary>
              <span class="ui-layout-media onboarding-checklist-complete">
                <span
                  aria-hidden="true"
                  class="ui-tabular-nums onboarding-checklist-marker onboarding-checklist-done"
                  >✓</span
                >
                <span
                  >Upload a photo of your bass<span class="ui-sr-only"
                    >, done</span
                  ></span
                >
              </span>
            </AccordionSummary>
            <AccordionContent>
              <p>
                Big Bertha looks totally rad. Five stars, no notes. Add more!
              </p>
              <div class="ui-layout-row ui-small">
                <Button href="#onboarding-checklist-photos" size="small"
                  >Add photos</Button
                >
              </div>
            </AccordionContent>
          </Accordion>
          <Accordion name="onboarding-checklist-steps">
            <AccordionSummary>
              <span class="ui-layout-media onboarding-checklist-complete">
                <span
                  aria-hidden="true"
                  class="ui-tabular-nums onboarding-checklist-marker onboarding-checklist-done"
                  >✓</span
                >
                <span>Find friends<span class="ui-sr-only">, done</span></span>
              </span>
            </AccordionSummary>
            <AccordionContent>
              <p>Lou, Percy and Stella are now on your friends list. Rad!</p>
              <div class="ui-layout-row ui-small">
                <Button href="#onboarding-checklist-friends" size="small"
                  >Find more friends</Button
                >
              </div>
            </AccordionContent>
          </Accordion>
          <Accordion name="onboarding-checklist-steps" open>
            <AccordionSummary>
              <span class="ui-layout-media">
                <span
                  aria-hidden="true"
                  class="ui-tabular-nums onboarding-checklist-marker"
                  >4</span
                >
                <span>Pick a best friend</span>
              </span>
            </AccordionSummary>
            <AccordionContent>
              <p>
                Your best friend shows up first on your profile, with a sparkly
                badge. Choose wisely (we won't tell your drummer).
              </p>
              <div class="ui-layout-row ui-small">
                <Button
                  href="#onboarding-checklist-best-friend"
                  size="small"
                  variant="filled"
                  >Pick best friend</Button
                >
                <Button
                  href="#onboarding-checklist-top-friends"
                  size="small"
                  variant="outlined"
                  >Rank top 8</Button
                >
              </div>
            </AccordionContent>
          </Accordion>
          <Accordion name="onboarding-checklist-steps">
            <AccordionSummary>
              <span class="ui-layout-media">
                <span
                  aria-hidden="true"
                  class="ui-tabular-nums onboarding-checklist-marker"
                  >5</span
                >
                <span>Scribble on someone's wall</span>
              </span>
            </AccordionSummary>
            <AccordionContent>
              <p>
                Say hi to a fellow bassist! A "nice slap tone" goes a long, long
                way.
              </p>
              <div class="ui-layout-row ui-small">
                <Button
                  href="#onboarding-checklist-wall"
                  size="small"
                  variant="outlined"
                  >Write on a wall</Button
                >
              </div>
            </AccordionContent>
          </Accordion>
          <Accordion name="onboarding-checklist-steps">
            <AccordionSummary>
              <span class="ui-layout-media">
                <span
                  aria-hidden="true"
                  class="ui-tabular-nums onboarding-checklist-marker"
                  >6</span
                >
                <span>Get Bassbook Messenger</span>
              </span>
            </AccordionSummary>
            <AccordionContent>
              <p>
                Chat with your bass buddies from the desktop, with buzzy nudges.
              </p>
              <div class="ui-layout-row ui-small">
                <Button
                  href="#onboarding-checklist-download"
                  size="small"
                  variant="outlined"
                  >Download</Button
                >
              </div>
            </AccordionContent>
          </Accordion>
        </Card>
        <Callout severity="info">
          <svg
            data-icon="help"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 17h-2v-2h2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25"
            ></path>
          </svg>
          <CalloutContent>
            <p>
              Stuck on a step?
              <a class="ui-link" href="#onboarding-checklist-message"
                >Send a message</a
              >
              to Ines, our super friendly welcome wizard.
            </p>
          </CalloutContent>
        </Callout>
      </CardContent>
    </Card>
  </div>
</template>

<style>
.onboarding-checklist {
  .onboarding-checklist-head {
    align-items: start;
    flex-wrap: nowrap;
  }

  .onboarding-checklist-complete {
    color: var(--ui-text);
    font-weight: var(--ui-font-weight-medium);
  }

  .onboarding-checklist-marker {
    block-size: 1.75rem;
    border: var(--ui-border-width) solid var(--ui-border-color);
    border-radius: var(--ui-radius-round);
    display: inline-grid;
    inline-size: 1.75rem;
    place-items: center;
  }

  .onboarding-checklist-done {
    background-color: var(--ui-primary);
    border-color: var(--ui-primary);
    color: var(--ui-on-primary);
  }

  details > .ui-content {
    padding-inline-start: 3.75rem;
  }
}
</style>
