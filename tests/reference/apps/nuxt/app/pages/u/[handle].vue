<script setup lang="ts">
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
} from "opui-css/vue"
import { ME, photosBy, postsBy, user } from "reference-shared"

const route = useRoute()
const profile = user(String(route.params.handle))
if (!profile) {
  throw createError({
    fatal: true,
    statusCode: 404,
    statusMessage: "Not Found",
  })
}

const name = ref(profile.name)
const bio = ref(profile.bio)
const draftName = ref(name.value)
const draftBio = ref(bio.value)
const posts = postsBy(profile.handle)
const photos = photosBy(profile.handle)

useHead({ title: name })

const save = () => {
  name.value = draftName.value
  bio.value = draftBio.value
}

const reset = () => {
  draftName.value = name.value
  draftBio.value = bio.value
}
</script>

<template>
  <div class="app-screen" data-screen="profile">
    <div class="app-profile-header">
      <UserAvatar size="large" :user="profile" />
      <h1>{{ name }}</h1>
      <Button
        v-if="profile.handle === ME"
        command="show-modal"
        commandfor="edit-profile"
        variant="outlined"
        >Edit profile</Button
      >
      <NuxtLink
        v-else
        v-slot="{ navigate }"
        custom
        :to="`/chat?with=${profile.handle}`"
      >
        <Button
          :href="`/chat?with=${profile.handle}`"
          variant="outlined"
          @click="navigate"
          >Send message</Button
        >
      </NuxtLink>
    </div>
    <p>{{ bio }}</p>
    <DescriptionList>
      <DescriptionListItem>
        <DescriptionListTerm>Location</DescriptionListTerm>
        <DescriptionListDescription>{{
          profile.location
        }}</DescriptionListDescription>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Joined</DescriptionListTerm>
        <DescriptionListDescription>{{
          profile.joined
        }}</DescriptionListDescription>
      </DescriptionListItem>
    </DescriptionList>
    <div class="app-stats">
      <Stat label="Posts">{{ posts.length }}</Stat>
      <Stat label="Photos">{{ photos.length }}</Stat>
    </div>
    <Tabs name="profile-tabs">
      <TabsItem checked>
        <TabsLabel>Posts</TabsLabel>
        <TabsPanel>
          <template v-if="posts.length">
            <article v-for="post in posts" :key="post.id">
              <p>{{ post.text }}</p>
              <p>
                <time :datetime="post.datetime">{{ post.time }}</time>
              </p>
            </article>
          </template>
          <p v-else class="app-empty">No posts yet.</p>
        </TabsPanel>
      </TabsItem>
      <TabsItem>
        <TabsLabel>Photos</TabsLabel>
        <TabsPanel>
          <div v-if="photos.length" class="app-profile-photos">
            <img
              v-for="{ alt, id, src } in photos"
              :key="id"
              :alt="alt"
              :src="src"
            />
          </div>
          <p v-else class="app-empty">No photos yet.</p>
        </TabsPanel>
      </TabsItem>
    </Tabs>
    <Dialog v-if="profile.handle === ME" id="edit-profile" @close="reset">
      <DialogHeader closeButton>
        <DialogTitle>Edit profile</DialogTitle>
      </DialogHeader>
      <form method="dialog" @submit="save">
        <DialogContent>
          <TextField v-model="draftName" label="Name" name="name" required />
          <Textarea v-model="draftBio" label="Bio" name="bio" />
        </DialogContent>
        <DialogFooter>
          <Button command="close" commandfor="edit-profile">Cancel</Button>
          <Button type="submit" variant="filled">Save</Button>
        </DialogFooter>
      </form>
    </Dialog>
  </div>
</template>
