<script lang="ts">
  import { Avatar, AvatarGroup } from "opui-css/svelte"
</script>

<AvatarGroup aria-label="Fans">
  <Avatar label="Holly Humbucker">HH</Avatar>
  <Avatar label="Ines Hertz">IH</Avatar>
  <Avatar label="Lou Headstock">LH</Avatar>
  <Avatar as="button" label="4 more fans" variant="tonal">+4</Avatar>
</AvatarGroup>
