<script lang="ts">
  import { Callout, CalloutContent, CalloutIcon } from "opui-css/svelte"
</script>

<Callout severity="critical">
  <CalloutIcon />
  <CalloutContent
    >Payment failed. Update your card to keep Bassbook Gold.</CalloutContent
  >
</Callout>
<Callout severity="info">
  <CalloutIcon />
  <CalloutContent>Your Bassbook Gold trial ends in 7 days.</CalloutContent>
</Callout>
<Callout severity="neutral">
  <CalloutContent>This setlist is archived and read-only.</CalloutContent>
</Callout>
<Callout severity="success">
  <CalloutIcon />
  <CalloutContent>Woohoo, your pedalboard changes were saved.</CalloutContent>
</Callout>
<Callout severity="warning">
  <CalloutIcon />
  <CalloutContent>Your slap video storage is 90% full.</CalloutContent>
</Callout>
<Callout severity="critical" variant="outlined">
  <CalloutIcon />
  <CalloutContent
    >Payment failed. Update your card to keep Bassbook Gold.</CalloutContent
  >
</Callout>
<Callout severity="info" variant="outlined">
  <CalloutIcon />
  <CalloutContent>Your Bassbook Gold trial ends in 7 days.</CalloutContent>
</Callout>
<Callout severity="neutral" variant="outlined">
  <CalloutContent>This setlist is archived and read-only.</CalloutContent>
</Callout>
<Callout severity="success" variant="outlined">
  <CalloutIcon />
  <CalloutContent>Woohoo, your pedalboard changes were saved.</CalloutContent>
</Callout>
<Callout severity="warning" variant="outlined">
  <CalloutIcon />
  <CalloutContent>Your slap video storage is 90% full.</CalloutContent>
</Callout>
