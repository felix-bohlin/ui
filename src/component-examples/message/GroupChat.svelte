<script lang="ts">
  import { Avatar, Message, MessageList } from "opui-css/svelte"
</script>

<MessageList aria-label="Messages in #design">
  <li class="ui-divider">Today</li>
  <Message author="Lena" datetime="2026-10-08T09:12" time="09:12">
    {#snippet start()}
      <Avatar aria-hidden="true">LH</Avatar>
    {/snippet}
    <p>The new icons are ready.</p>
  </Message>
  <Message author="Lena" datetime="2026-10-08T09:13" time="09:13">
    {#snippet start()}
      <Avatar aria-hidden="true">LH</Avatar>
    {/snippet}
    <p>Can we review them today?</p>
  </Message>
  <Message author="Hakki" datetime="2026-10-08T09:15" newAuthor time="09:15">
    {#snippet start()}
      <Avatar aria-hidden="true">HH</Avatar>
    {/snippet}
    <p>I'm free after lunch.</p>
  </Message>
  <Message author="Hakki" datetime="2026-10-08T09:16" time="09:16">
    {#snippet start()}
      <Avatar aria-hidden="true">HH</Avatar>
    {/snippet}
    <p>I'll book a room.</p>
  </Message>
  <li class="ui-divider">Hakki added you</li>
  <Message author="You" datetime="2026-10-08T09:20" outgoing time="09:20">
    <p>See you at one.</p>
  </Message>
</MessageList>
