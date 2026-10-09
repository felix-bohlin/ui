<script lang="ts">
  import { Avatar, Message, Messages } from "opui-css/svelte"
</script>

<Messages label="Messages with Saga">
  <Message author="Saga" datetime="2026-10-08T14:32" time="14:32">
    {#snippet avatar()}
      <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
    {/snippet}
    <p>Let me check with the team.</p>
  </Message>
  <Message typing>
    {#snippet avatar()}
      <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
    {/snippet}
    Saga is typing…
  </Message>
</Messages>
