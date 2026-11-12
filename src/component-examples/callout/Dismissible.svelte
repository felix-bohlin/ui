<script lang="ts">
  import { Callout, CalloutContent, CalloutIcon } from "opui-css/svelte"
</script>

<Callout
  closeLabel="Dismiss"
  dismissible
  ondismiss={(event) => {
    if (!confirm("Hide this message?")) event.preventDefault()
  }}
  severity="info"
>
  <CalloutIcon />
  <CalloutContent>
    The new editor is on for everyone. Your drafts from the old one are in
    Settings.
  </CalloutContent>
</Callout>
