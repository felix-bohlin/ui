<script lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DescriptionList,
    DescriptionListDescription,
    DescriptionListItem,
    DescriptionListTerm,
    Stat,
    Tabs,
    TabsItem,
    TabsLabel,
    TabsPanel,
    TextField,
    Textarea,
  } from "opui-css/svelte"
  import { ME, photosBy, postsBy } from "reference-shared"
  import UserAvatar from "#lib/UserAvatar.svelte"

  let { data } = $props()

  const profile = $derived(data.user)
  let edits: Record<string, { bio: string; name: string }> = $state({})
  const name = $derived(edits[profile.handle]?.name ?? profile.name)
  const bio = $derived(edits[profile.handle]?.bio ?? profile.bio)
  const posts = $derived(postsBy(profile.handle))
  const photos = $derived(photosBy(profile.handle))

  const save = (event: SubmitEvent) => {
    const form = new FormData(event.currentTarget as HTMLFormElement)
    edits[profile.handle] = {
      bio: String(form.get("bio")),
      name: String(form.get("name")),
    }
  }
</script>

<svelte:head>
  <title>{name} | Reference</title>
</svelte:head>

<div class="app-screen" data-screen="profile">
  <div class="app-profile-header">
    <UserAvatar size="large" user={profile} />
    <h1>{name}</h1>
    {#if profile.handle === ME}
      <Button command="show-modal" commandfor="edit-profile" variant="outlined"
        >Edit profile</Button
      >
    {:else}
      <Button href="/chat?with={profile.handle}" variant="outlined"
        >Send message</Button
      >
    {/if}
  </div>
  <p>{bio}</p>
  <DescriptionList>
    <DescriptionListItem>
      <DescriptionListTerm>Location</DescriptionListTerm>
      <DescriptionListDescription>{profile.location}</DescriptionListDescription
      >
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Joined</DescriptionListTerm>
      <DescriptionListDescription>{profile.joined}</DescriptionListDescription>
    </DescriptionListItem>
  </DescriptionList>
  <div class="app-stats">
    <Stat label="Posts">{posts.length}</Stat>
    <Stat label="Photos">{photos.length}</Stat>
  </div>
  <Tabs name="profile-tabs">
    <TabsItem checked>
      <TabsLabel>Posts</TabsLabel>
      <TabsPanel>
        {#each posts as post (post.id)}
          <article>
            <p>{post.text}</p>
            <p><time datetime={post.datetime}>{post.time}</time></p>
          </article>
        {:else}
          <p class="app-empty">No posts yet.</p>
        {/each}
      </TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsLabel>Photos</TabsLabel>
      <TabsPanel>
        {#if photos.length}
          <div class="app-profile-photos">
            {#each photos as { alt, id, src } (id)}
              <img {alt} {src} />
            {/each}
          </div>
        {:else}
          <p class="app-empty">No photos yet.</p>
        {/if}
      </TabsPanel>
    </TabsItem>
  </Tabs>
</div>

{#if profile.handle === ME}
  <Dialog id="edit-profile">
    <DialogHeader closeButton>
      <DialogTitle>Edit profile</DialogTitle>
    </DialogHeader>
    <form method="dialog" onsubmit={save}>
      <DialogContent>
        <TextField label="Name" name="name" required value={name} />
        <Textarea label="Bio" name="bio" value={bio} />
      </DialogContent>
      <DialogFooter>
        <Button command="close" commandfor="edit-profile">Cancel</Button>
        <Button type="submit" variant="filled">Save</Button>
      </DialogFooter>
    </form>
  </Dialog>
{/if}
