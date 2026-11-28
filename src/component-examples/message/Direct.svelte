<script lang="ts">
  import { Avatar, Message, MessageList } from "opui-css/svelte"
</script>

<div aria-label="Chat with Ellen" role="log">
  <MessageList aria-label="Messages with Ellen" direct>
    <Message author="Ellen" datetime="2026-10-08T14:02" time="14:02">
      {#snippet start()}
        <Avatar>EN</Avatar>
      {/snippet}
      <p>Heyyy! Did your band notice you changed strings yet?</p>
    </Message>
    <Message author="Ellen" datetime="2026-10-08T14:03" time="14:03">
      {#snippet start()}
        <Avatar>EN</Avatar>
      {/snippet}
      <p>Flatwounds, right? So rad.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
      <p>Nope, not even the drummer. Bummer, but WE know.</p>
    </Message>
    <Message author="Ellen" datetime="2026-10-08T14:21" time="14:21">
      {#snippet start()}
        <Avatar>EN</Avatar>
      {/snippet}
      <p>Their loss. Tab's in your inbox!</p>
    </Message>
  </MessageList>
</div>
