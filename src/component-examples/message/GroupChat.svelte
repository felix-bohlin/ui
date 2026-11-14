<script lang="ts">
  import { Avatar, Message, MessageList } from "opui-css/svelte"
</script>

<MessageList aria-label="Messages in Low End Theory">
  <li class="ui-divider">Today</li>
  <Message author="Lou" datetime="2026-10-08T09:12" time="09:12">
    {#snippet start()}
      <Avatar aria-hidden="true">LH</Avatar>
    {/snippet}
    <p>My new pedalboard is ready.</p>
  </Message>
  <Message author="Lou" datetime="2026-10-08T09:13" time="09:13">
    {#snippet start()}
      <Avatar aria-hidden="true">LH</Avatar>
    {/snippet}
    <p>Can we jam with it today?</p>
  </Message>
  <Message author="Holly" datetime="2026-10-08T09:15" newAuthor time="09:15">
    {#snippet start()}
      <Avatar aria-hidden="true">HH</Avatar>
    {/snippet}
    <p>I'm free after lunch :)</p>
  </Message>
  <Message author="Holly" datetime="2026-10-08T09:16" time="09:16">
    {#snippet start()}
      <Avatar aria-hidden="true">HH</Avatar>
    {/snippet}
    <p>I'll book the rehearsal room.</p>
  </Message>
  <li class="ui-divider">Holly added you</li>
  <Message author="You" datetime="2026-10-08T09:20" outgoing time="09:20">
    <p>See you at one, bring snacks.</p>
  </Message>
</MessageList>
