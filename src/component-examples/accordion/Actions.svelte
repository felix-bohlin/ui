<script lang="ts">
  import {
    Accordion,
    AccordionActions,
    AccordionContent,
    AccordionSummary,
    Button,
  } from "opui-css/svelte"
</script>

<Accordion open variant="elevated">
  <AccordionSummary>Bassbook house rules</AccordionSummary>
  <AccordionContent>
    <p>
      We updated the house rules on 1 March. The changes cover how long we keep
      your slap videos and how Bassbook Gold renews.
    </p>
  </AccordionContent>
  <AccordionActions>
    <Button>Decline</Button>
    <Button>Accept</Button>
  </AccordionActions>
</Accordion>

<Accordion open variant="elevated">
  <AccordionSummary>Invite your bandmates</AccordionSummary>
  <AccordionContent>
    <p>
      Bandmates you invite can view and edit every setlist in your band room.
    </p>
  </AccordionContent>
  <AccordionActions align="start">
    <Button>Copy link</Button>
    <Button>Send invites</Button>
  </AccordionActions>
</Accordion>
