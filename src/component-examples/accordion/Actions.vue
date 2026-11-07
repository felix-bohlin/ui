<script setup lang="ts">
import {
  Accordion,
  AccordionActions,
  AccordionContent,
  AccordionSummary,
  Button,
} from "opui-css/vue"
</script>

<template>
  <Accordion open variant="elevated">
    <AccordionSummary>Terms of service</AccordionSummary>
    <AccordionContent>
      <p>
        We updated our terms on 1 March. The changes cover how long we keep your
        files and how annual plans renew.
      </p>
    </AccordionContent>
    <AccordionActions>
      <Button>Decline</Button>
      <Button>Accept</Button>
    </AccordionActions>
  </Accordion>

  <Accordion open variant="elevated">
    <AccordionSummary>Invite your team</AccordionSummary>
    <AccordionContent>
      <p>
        Teammates you invite can view and edit every project in this workspace.
      </p>
    </AccordionContent>
    <AccordionActions align="start">
      <Button>Copy link</Button>
      <Button>Send invites</Button>
    </AccordionActions>
  </Accordion>
</template>
