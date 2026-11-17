<script lang="ts">
  import {
    Avatar,
    Message,
    MessageList,
    ToggleButton,
    ToggleGroup,
  } from "opui-css/svelte"
</script>

<MessageList aria-label="Messages with Stella">
  <Message author="Stella" datetime="2026-10-08T16:05" time="16:05">
    {#snippet start()}
      <Avatar aria-hidden="true">SN</Avatar>
    {/snippet}
    <p>My slap cover is up. Thanks for listening, everyone!</p>
    {#snippet bottom()}
      <ToggleGroup aria-label="Reactions" multiple name="reaction">
        <ToggleButton aria-label="Thumbs up, 2" defaultChecked value="+1"
          ><span aria-hidden="true">👍 2</span></ToggleButton
        >
        <ToggleButton aria-label="Party, 1" value="tada"
          ><span aria-hidden="true">🎉 1</span></ToggleButton
        >
      </ToggleGroup>
    {/snippet}
  </Message>
  <Message author="You" datetime="2026-10-08T16:07" outgoing time="16:07">
    <p>Totally rad, that low B rattled my windows.</p>
    {#snippet bottom()}
      <ToggleGroup aria-label="Reactions" multiple name="reaction">
        <ToggleButton aria-label="Heart, 1" value="heart"
          ><span aria-hidden="true">❤️ 1</span></ToggleButton
        >
      </ToggleGroup>
    {/snippet}
  </Message>
</MessageList>
