<script lang="ts">
  import { Avatar, Message, MessageList } from "opui-css/svelte"
</script>

<MessageList aria-label="Messages with Sirkka">
  <Message author="Sirkka" datetime="2026-10-08T14:32" time="14:32">
    {#snippet start()}
      <Avatar aria-label="Sirkka Nitti" role="img">SN</Avatar>
    {/snippet}
    <p>Let me check with the team.</p>
  </Message>
  <Message typing>
    {#snippet start()}
      <Avatar aria-label="Sirkka Nitti" role="img">SN</Avatar>
    {/snippet}
    Sirkka is typing…
  </Message>
</MessageList>
