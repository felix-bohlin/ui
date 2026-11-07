<script lang="ts">
  import {
    Button,
    Callout,
    CalloutActions,
    CalloutContent,
    CalloutIcon,
  } from "opui-css/svelte"
</script>

<Callout severity="warning">
  <CalloutIcon />
  <CalloutContent>
    <h3>Your trial ends in 3 days</h3>
    <p>Choose a plan to keep your projects and their history.</p>
  </CalloutContent>
  <CalloutActions>
    <Button size="small" variant="filled">Choose a plan</Button>
    <Button size="small">Remind me later</Button>
  </CalloutActions>
</Callout>
