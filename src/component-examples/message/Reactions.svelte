<script lang="ts">
  import {
    Avatar,
    Button,
    Menu,
    Message,
    Messages,
    ToggleButton,
    ToggleGroup,
  } from "opui-css/svelte"

  const picker = [
    { "aria-label": "Thumbs up", label: "👍", value: "+1" },
    { "aria-label": "Heart", label: "❤️", value: "heart" },
    { "aria-label": "Laughing", label: "😂", value: "joy" },
    { "aria-label": "Party", label: "🎉", value: "tada" },
    { "aria-label": "Eyes", label: "👀", value: "eyes" },
  ]
</script>

{#snippet addReactionIcon()}<svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    ><path
      fill="currentColor"
      d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8zm-3.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7 14a5.5 5.5 0 0 0 10 0zM19 1v3h-3v2h3v3h2V6h3V4h-3V1z"
    ></path></svg
  >{/snippet}

<Messages aria-label="Messages with Saga">
  <Message author="Saga" datetime="2026-10-08T16:05" time="16:05">
    {#snippet start()}
      <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
    {/snippet}
    <p>The deck is out. Thanks everyone!</p>
    {#snippet actions()}
      <Button
        aria-label="Add reaction"
        commandfor="message-reactions-1"
        command="toggle-popover"
        round
        size="x-small"
      >
        {@render addReactionIcon()}
      </Button>
      <Menu
        aria-label="Add reaction"
        id="message-reactions-1"
        items={picker}
        orientation="horizontal"
        side="block-start"
      />
    {/snippet}
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
    {#snippet actions()}
      <Button
        aria-label="Add reaction"
        commandfor="message-reactions-2"
        command="toggle-popover"
        round
        size="x-small"
      >
        {@render addReactionIcon()}
      </Button>
      <Menu
        align="end"
        aria-label="Add reaction"
        id="message-reactions-2"
        items={picker}
        orientation="horizontal"
        side="block-start"
      />
    {/snippet}
    {#snippet bottom()}
      <ToggleGroup aria-label="Reactions" multiple name="reaction">
        <ToggleButton aria-label="Heart, 1" value="heart"
          ><span aria-hidden="true">❤️ 1</span></ToggleButton
        >
      </ToggleGroup>
    {/snippet}
  </Message>
</Messages>
