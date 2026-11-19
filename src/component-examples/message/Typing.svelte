<script lang="ts">
  import { Avatar, Message, MessageList } from "opui-css/svelte"
</script>

<MessageList aria-label="Messages with Stella">
  <Message author="Stella" datetime="2026-10-08T14:32" time="14:32">
    {#snippet start()}
      <Avatar>SN</Avatar>
    {/snippet}
    <p>Let me ask if the band even noticed.</p>
  </Message>
  <Message typing>
    {#snippet start()}
      <Avatar>SN</Avatar>
    {/snippet}
    Stella is typing…
  </Message>
</MessageList>
