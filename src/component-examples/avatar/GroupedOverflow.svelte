<script lang="ts">
  import { Avatar, AvatarGroup } from "opui-css/svelte"
</script>

<AvatarGroup aria-label="Reviewers">
  <Avatar aria-label="Anna Berg" role="img">AB</Avatar>
  <Avatar aria-label="Carl Dahl" role="img">CD</Avatar>
  <Avatar aria-label="Eva Falk" role="img">EF</Avatar>
  <Avatar aria-label="Show 4 more reviewers" as="button" variant="tonal">
    +4
  </Avatar>
</AvatarGroup>
