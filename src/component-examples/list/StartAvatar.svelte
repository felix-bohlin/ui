<script lang="ts">
  import { Avatar, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem headline="Headline">
    {#snippet start()}<Avatar>AB</Avatar>{/snippet}
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    {#snippet start()}<Avatar>
        <img
          src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </Avatar>{/snippet}
  </ListItem>
</List>
