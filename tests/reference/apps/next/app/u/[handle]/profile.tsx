"use client"

import {
  Button,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Stat,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  TextField,
  Textarea,
} from "opui-css/react"
import { ME, photosBy, postsBy, type User } from "reference-shared"
import { useEffect, useState, type FormEvent } from "react"
import UserAvatar from "@/lib/user-avatar"

export default function Profile({ profile }: { profile: User }) {
  const [edit, setEdit] = useState<{ bio: string; name: string }>()
  const name = edit?.name ?? profile.name
  const bio = edit?.bio ?? profile.bio
  const [form, setForm] = useState({ bio, key: 0, name })
  const posts = postsBy(profile.handle)
  const photos = photosBy(profile.handle)

  useEffect(() => {
    if (edit) document.title = `${edit.name} | Reference`
  }, [edit])

  const save = (event: FormEvent<HTMLFormElement>) => {
    const form = new FormData(event.currentTarget)
    setEdit({ bio: String(form.get("bio")), name: String(form.get("name")) })
  }

  return (
    <>
      <div className="app-screen" data-screen="profile">
        <div className="app-profile-header">
          <UserAvatar size="large" user={profile} />
          <h1>{name}</h1>
          {profile.handle === ME ? (
            <Button
              command="show-modal"
              commandfor="edit-profile"
              onClick={() =>
                setForm(({ key }) => ({ bio, key: key + 1, name }))
              }
              variant="outlined"
            >
              Edit profile
            </Button>
          ) : (
            <Button href={`/chat?with=${profile.handle}`} variant="outlined">
              Send message
            </Button>
          )}
        </div>
        <p>{bio}</p>
        <DescriptionList>
          <DescriptionListItem>
            <DescriptionListTerm>Location</DescriptionListTerm>
            <DescriptionListDescription>
              {profile.location}
            </DescriptionListDescription>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm>Joined</DescriptionListTerm>
            <DescriptionListDescription>
              {profile.joined}
            </DescriptionListDescription>
          </DescriptionListItem>
        </DescriptionList>
        <div className="app-stats">
          <Stat label="Posts">{posts.length}</Stat>
          <Stat label="Photos">{photos.length}</Stat>
        </div>
        <Tabs name="profile-tabs">
          <TabsItem defaultChecked>
            <TabsLabel>Posts</TabsLabel>
            <TabsPanel>
              {posts.length ? (
                posts.map((post) => (
                  <article key={post.id}>
                    <p>{post.text}</p>
                    <p>
                      <time dateTime={post.datetime}>{post.time}</time>
                    </p>
                  </article>
                ))
              ) : (
                <p className="app-empty">No posts yet.</p>
              )}
            </TabsPanel>
          </TabsItem>
          <TabsItem>
            <TabsLabel>Photos</TabsLabel>
            <TabsPanel>
              {photos.length ? (
                <div className="app-profile-photos">
                  {photos.map(({ alt, id, src }) => (
                    <img alt={alt} key={id} src={src} />
                  ))}
                </div>
              ) : (
                <p className="app-empty">No photos yet.</p>
              )}
            </TabsPanel>
          </TabsItem>
        </Tabs>
      </div>
      {profile.handle === ME && (
        <Dialog id="edit-profile">
          <DialogHeader closeButton>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <form key={form.key} method="dialog" onSubmit={save}>
            <DialogContent>
              <TextField
                defaultValue={form.name}
                label="Name"
                name="name"
                required
              />
              <Textarea defaultValue={form.bio} label="Bio" name="bio" />
            </DialogContent>
            <DialogFooter>
              <Button command="close" commandfor="edit-profile">
                Cancel
              </Button>
              <Button type="submit" variant="filled">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      )}
    </>
  )
}
