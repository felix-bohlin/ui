<script lang="ts">
  import { Avatar, Message, Messages } from "opui-css/svelte"
</script>

<Messages label="Messages in #design">
  <Message author="Leila" datetime="2026-10-08T09:12" time="09:12">
    {#snippet avatar()}
      <Avatar aria-label="Leila Haddad" role="img">LH</Avatar>
    {/snippet}
    <p>The new icons are ready.</p>
  </Message>
  <Message author="Leila" datetime="2026-10-08T09:13" time="09:13">
    {#snippet avatar()}
      <Avatar aria-label="Leila Haddad" role="img">LH</Avatar>
    {/snippet}
    <p>Can we review them today?</p>
  </Message>
  <Message author="Omar" datetime="2026-10-08T09:15" newAuthor time="09:15">
    {#snippet avatar()}
      <Avatar aria-label="Omar Saleh" role="img">OS</Avatar>
    {/snippet}
    <p>I'm free after lunch.</p>
  </Message>
  <Message author="Omar" datetime="2026-10-08T09:16" time="09:16">
    {#snippet avatar()}
      <Avatar aria-label="Omar Saleh" role="img">OS</Avatar>
    {/snippet}
    <p>I'll book a room.</p>
  </Message>
  <Message author="You" datetime="2026-10-08T09:20" outgoing time="09:20">
    <p>See you at one.</p>
  </Message>
</Messages>
