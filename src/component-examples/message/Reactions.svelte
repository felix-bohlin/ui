<script lang="ts">
  import {
    Avatar,
    Message,
    Messages,
    ToggleButton,
    ToggleGroup,
  } from "opui-css/svelte"
</script>

<Messages aria-label="Messages with Saga">
  <Message author="Saga" datetime="2026-10-08T16:05" time="16:05">
    {#snippet start()}
      <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
    {/snippet}
    <p>The deck is out. Thanks everyone!</p>
    {#snippet bottom()}
      <ToggleGroup aria-label="Reactions" multiple name="reaction">
        <ToggleButton aria-label="Thumbs up, 2" checked value="+1"
          ><span aria-hidden="true">👍 2</span></ToggleButton
        >
        <ToggleButton aria-label="Party, 1" value="tada"
          ><span aria-hidden="true">🎉 1</span></ToggleButton
        >
      </ToggleGroup>
    {/snippet}
  </Message>
  <Message author="You" datetime="2026-10-08T16:07" outgoing time="16:07">
    <p>Great work, it looks sharp.</p>
    {#snippet bottom()}
      <ToggleGroup aria-label="Reactions" multiple name="reaction">
        <ToggleButton aria-label="Heart, 1" value="heart"
          ><span aria-hidden="true">❤️ 1</span></ToggleButton
        >
      </ToggleGroup>
    {/snippet}
  </Message>
</Messages>
