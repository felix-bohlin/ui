import { useParams } from "@solidjs/router"
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
  Field,
  Stat,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
} from "opui-css/solid"
import { ME, photosBy, postsBy, user, type User } from "reference-shared"
import { createMemo, createSignal, createStore, For, Show } from "solid-js"
import UserAvatar from "../lib/UserAvatar"
import { useTitle } from "../lib/title"
import NotFound from "./NotFound"

type Edit = { bio: string; name: string }

export default function Profile() {
  const params = useParams<{ handle: string }>()
  const found = createMemo(() => user(params.handle))
  return (
    <Show when={found()} fallback={<NotFound />}>
      {(profile) => <ProfileScreen profile={profile()} />}
    </Show>
  )
}

function ProfileScreen(props: { profile: User }) {
  const [edits, setEdits] = createStore<Record<string, Edit>>({})
  const name = createMemo(
    () => edits[props.profile.handle]?.name ?? props.profile.name,
  )
  const bio = createMemo(
    () => edits[props.profile.handle]?.bio ?? props.profile.bio,
  )
  const posts = createMemo(() => postsBy(props.profile.handle))
  const photos = createMemo(() => photosBy(props.profile.handle))
  const [draftName, setDraftName] = createSignal(() => name())
  const [draftBio, setDraftBio] = createSignal(() => bio())
  useTitle(name)

  const save = () => {
    const handle = props.profile.handle
    const edit = { bio: draftBio(), name: draftName() }
    setEdits((draft) => {
      draft[handle] = edit
    })
  }

  const reset = () => {
    setDraftName(name())
    setDraftBio(bio())
  }

  return (
    <>
      <div class="app-screen" data-screen="profile">
        <div class="app-profile-header">
          <UserAvatar size="large" user={props.profile} />
          <h1>{name()}</h1>
          <Show
            when={props.profile.handle === ME}
            fallback={
              <Button
                href={`/chat?with=${props.profile.handle}`}
                variant="outlined"
              >
                Send message
              </Button>
            }
          >
            <Button
              command="show-modal"
              commandfor="edit-profile"
              variant="outlined"
            >
              Edit profile
            </Button>
          </Show>
        </div>
        <p>{bio()}</p>
        <DescriptionList>
          <DescriptionListItem>
            <DescriptionListTerm>Location</DescriptionListTerm>
            <DescriptionListDescription>
              {props.profile.location}
            </DescriptionListDescription>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionListTerm>Joined</DescriptionListTerm>
            <DescriptionListDescription>
              {props.profile.joined}
            </DescriptionListDescription>
          </DescriptionListItem>
        </DescriptionList>
        <div class="app-stats">
          <Stat label="Posts">{posts().length}</Stat>
          <Stat label="Photos">{photos().length}</Stat>
        </div>
        <Tabs name="profile-tabs">
          <TabsItem checked>
            <TabsLabel>Posts</TabsLabel>
            <TabsPanel>
              <For
                each={posts()}
                fallback={<p class="app-empty">No posts yet.</p>}
              >
                {(post) => (
                  <article>
                    <p>{post.text}</p>
                    <p>
                      <time datetime={post.datetime}>{post.time}</time>
                    </p>
                  </article>
                )}
              </For>
            </TabsPanel>
          </TabsItem>
          <TabsItem>
            <TabsLabel>Photos</TabsLabel>
            <TabsPanel>
              <Show
                when={photos().length}
                fallback={<p class="app-empty">No photos yet.</p>}
              >
                <div class="app-profile-photos">
                  <For each={photos()}>
                    {(item) => <img alt={item.alt} src={item.src} />}
                  </For>
                </div>
              </Show>
            </TabsPanel>
          </TabsItem>
        </Tabs>
      </div>
      <Show when={props.profile.handle === ME}>
        <Dialog id="edit-profile" onClose={reset}>
          <DialogHeader closeButton>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <form method="dialog" onSubmit={save}>
            <DialogContent>
              <Field for="profile-name" label="Name">
                <input
                  id="profile-name"
                  name="name"
                  onInput={(event) => setDraftName(event.currentTarget.value)}
                  required
                  value={draftName()}
                />
              </Field>
              <Field for="profile-bio" label="Bio">
                <textarea
                  id="profile-bio"
                  name="bio"
                  onInput={(event) => setDraftBio(event.currentTarget.value)}
                  value={draftBio()}
                />
              </Field>
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
      </Show>
    </>
  )
}
