<script lang="ts">
  import { Avatar, Message, MessageList } from "opui-css/svelte"
</script>

<MessageList aria-label="Messages with Ellen">
  <Message author="Ellen" datetime="2026-10-08T14:32" time="14:32">
    {#snippet start()}
      <Avatar>EN</Avatar>
    {/snippet}
    <p>Let me ask if the band even noticed.</p>
  </Message>
  <Message typing>
    {#snippet start()}
      <Avatar>EN</Avatar>
    {/snippet}
    Ellen is typing…
  </Message>
</MessageList>
