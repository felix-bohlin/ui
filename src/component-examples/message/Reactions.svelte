<script lang="ts">
  import { Avatar, Message, Messages } from "opui-css/svelte"

  const picker = [
    { emoji: "👍", label: "Thumbs up", value: "+1" },
    { emoji: "❤️", label: "Heart", value: "heart" },
    { emoji: "😂", label: "Laughing", value: "joy" },
    { emoji: "🎉", label: "Party", value: "tada" },
    { emoji: "👀", label: "Eyes", value: "eyes" },
  ]
</script>

<Messages label="Messages in #pricing">
  <Message
    author="Saga"
    datetime="2026-10-08T14:03"
    {picker}
    reactions={[
      {
        count: 3,
        emoji: "👍",
        label: "Thumbs up, 2 others",
        mine: true,
        value: "+1",
      },
      { count: 1, emoji: "🙏", label: "Folded hands, 1 other", value: "pray" },
    ]}
    time="14:03"
  >
    {#snippet avatar()}
      <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
    {/snippet}
    <p>No rush, Friday is fine.</p>
  </Message>
  <Message
    author="You"
    datetime="2026-10-08T14:18"
    outgoing
    {picker}
    reactions={[
      { count: 3, emoji: "🎉", label: "Party, 3 others", value: "tada" },
      { count: 1, emoji: "❤️", label: "Heart, 1 other", value: "heart" },
    ]}
    time="14:18"
  >
    <p>Yes, looks good. I'd lead with the annual plan.</p>
  </Message>
</Messages>
