<script lang="ts">
  import { Avatar } from "opui-css/svelte"
  import type { User } from "reference-shared"

  let { size, user }: { size?: "large" | "small"; user: User } = $props()
</script>

<Avatar {size} src={user.photo}>{user.initials}</Avatar>
