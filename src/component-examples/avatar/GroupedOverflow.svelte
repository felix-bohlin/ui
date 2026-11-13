<script lang="ts">
  import { Avatar, AvatarGroup } from "opui-css/svelte"
</script>

<AvatarGroup aria-label="Fans">
  <Avatar aria-label="Holly Humbucker" role="img">HH</Avatar>
  <Avatar aria-label="Ines Hertz" role="img">IH</Avatar>
  <Avatar aria-label="Lou Headstock" role="img">LH</Avatar>
  <Avatar as="button" variant="tonal">
    +4<span class="ui-sr-only"> more fans</span>
  </Avatar>
</AvatarGroup>
