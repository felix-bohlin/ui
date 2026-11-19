<script setup lang="ts">
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Menu,
  ToggleButton,
  ToggleGroup,
} from "opui-css/vue"
import { photo, user, type Post } from "reference-shared"

const { post, saved } = defineProps<{ post: Post; saved: boolean }>()
const emit = defineEmits<{ hide: []; toggleSave: [] }>()

const author = computed(() => user(post.author)!)
const photos = computed(() => post.photos.map((id) => photo(id)!))
const reacted = ref<string[]>([])

const copyLink = () =>
  navigator.clipboard.writeText(`${location.origin}/posts/${post.id}`)

const items = computed(() => [
  { label: "Copy link", onClick: copyLink },
  {
    form: `save-post-${post.id}`,
    label: saved ? "Remove from saved" : "Save post",
    type: "submit" as const,
  },
  { label: "Hide post", onClick: () => emit("hide") },
])
</script>

<template>
  <Card
    :aria-labelledby="`post-${post.id}-author`"
    as="article"
    variant="outlined"
  >
    <CardHeader as="header">
      <UserAvatar :user="author" />
      <hgroup>
        <h2 :id="`post-${post.id}-author`">
          <NuxtLink :to="`/u/${author.handle}`">{{ author.name }}</NuxtLink>
        </h2>
        <p>
          <time :datetime="post.datetime">{{ post.time }}</time>
        </p>
      </hgroup>
      <Button
        :aria-label="`Options for ${author.name}'s post`"
        command="toggle-popover"
        :commandfor="`post-menu-${post.id}`"
      >
        <AppIcon name="more" />
      </Button>
    </CardHeader>
    <Menu align="end" :id="`post-menu-${post.id}`" :items="items" />
    <form
      hidden
      :id="`save-post-${post.id}`"
      @submit.prevent="emit('toggleSave')"
    ></form>
    <CardContent>
      <p>{{ post.text }}</p>
      <div v-if="photos.length" class="app-post-photos">
        <img
          v-for="{ alt, id, src } in photos"
          :key="id"
          :alt="alt"
          :src="src"
        />
      </div>
    </CardContent>
    <CardActions align="start">
      <ToggleGroup
        v-model="reacted"
        aria-label="Reactions"
        multiple
        :name="`reactions-${post.id}`"
        size="small"
      >
        <ToggleButton
          v-for="reaction in post.reactions"
          :key="reaction.value"
          :value="reaction.value"
          >{{ reaction.label }}
          {{
            reaction.count + (reacted.includes(reaction.value) ? 1 : 0)
          }}</ToggleButton
        >
      </ToggleGroup>
    </CardActions>
  </Card>
</template>
