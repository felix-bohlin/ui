<script lang="ts">
  import { Avatar } from "opui-css/svelte"
  import type { User } from "reference-shared"

  let {
    link = false,
    size,
    user,
  }: { link?: boolean; size?: "large" | "small"; user: User } = $props()
</script>

{#if link}
  {#if user.photo}
    <Avatar
      alt=""
      aria-hidden="true"
      href="/u/{user.handle}"
      {size}
      src={user.photo}
      tabindex={-1}
    />
  {:else}
    <Avatar aria-hidden="true" href="/u/{user.handle}" {size} tabindex={-1}
      >{user.initials}</Avatar
    >
  {/if}
{:else if user.photo}
  <Avatar alt="" {size} src={user.photo} />
{:else}
  <Avatar aria-hidden="true" {size}>{user.initials}</Avatar>
{/if}
