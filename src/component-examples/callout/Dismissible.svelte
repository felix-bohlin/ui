<script lang="ts">
  import { Callout, CalloutContent, CalloutIcon } from "opui-css/svelte"
</script>

<Callout
  closeButton
  closeLabel="Dismiss"
  ondismiss={(event) => {
    if (!confirm("Hide this message?")) event.preventDefault()
  }}
  severity="info"
>
  <CalloutIcon />
  <CalloutContent>
    The new tab editor is on for everyone. Your drafts from the old one are in
    Settings.
  </CalloutContent>
</Callout>
