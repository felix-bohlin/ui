<script setup lang="ts">
import { Button, Textarea, ToggleButton, ToggleGroup } from "opui-css/vue"
import {
  FEED_FILTERS,
  POSTS,
  feedPage,
  fetchFeedPage,
  newPost,
  type FeedFilter,
  type Post,
} from "reference-shared"

useHead({ title: "Feed" })

const first = feedPage(0)
const pageIndex = ref(0)
const loaded = ref<Post[]>(first.posts)
const hasMore = ref(first.hasMore)
const loading = ref(false)
const created = ref<Post[]>([])
const hidden = ref<string[]>([])
const saved = ref<string[]>([])
const filter = ref<FeedFilter>("all")
const text = ref("")

const visible = computed(() => {
  const shown = (posts: Post[]) =>
    posts.filter((post) => !hidden.value.includes(post.id))
  if (filter.value === "photos")
    return shown([...created.value, ...POSTS]).filter(
      (post) => post.photos.length > 0,
    )
  if (filter.value === "saved")
    return shown([...created.value, ...POSTS]).filter((post) =>
      saved.value.includes(post.id),
    )
  return shown([...created.value, ...loaded.value])
})

const loadMore = async () => {
  loading.value = true
  const next = await fetchFeedPage(pageIndex.value + 1)
  pageIndex.value += 1
  loaded.value = next.posts
  hasMore.value = next.hasMore
  loading.value = false
}

const submit = () => {
  created.value = [
    newPost(text.value, `new-${created.value.length + 1}`),
    ...created.value,
  ]
  text.value = ""
}

const toggleSave = (id: string) => {
  saved.value = saved.value.includes(id)
    ? saved.value.filter((candidate) => candidate !== id)
    : [...saved.value, id]
}
</script>

<template>
  <div class="app-screen" data-screen="feed">
    <h1>Feed</h1>
    <form
      aria-label="New post"
      class="ui-layout-column"
      @submit.prevent="submit"
    >
      <Textarea
        v-model="text"
        characterCount
        label="What's on your mind?"
        :maxlength="280"
        name="text"
        required
      />
      <div>
        <Button type="submit" variant="filled">Post</Button>
      </div>
    </form>
    <ToggleGroup v-model="filter" aria-label="Filter posts" name="filter">
      <ToggleButton
        v-for="{ label, value } in FEED_FILTERS"
        :key="value"
        :value="value"
        >{{ label }}</ToggleButton
      >
    </ToggleGroup>
    <ol
      v-if="visible.length"
      :aria-busy="loading ? 'true' : undefined"
      aria-label="Posts"
      class="app-posts"
    >
      <li v-for="post in visible" :key="post.id">
        <PostCard
          :post="post"
          :saved="saved.includes(post.id)"
          @hide="hidden = [...hidden, post.id]"
          @toggle-save="toggleSave(post.id)"
        />
      </li>
    </ol>
    <p v-else-if="filter === 'saved'" class="app-empty">No saved posts yet.</p>
    <template v-if="filter === 'all'">
      <div v-if="hasMore">
        <Button :disabled="loading" variant="outlined" @click="loadMore"
          >Load more</Button
        >
      </div>
      <p v-else class="app-end">You're all caught up.</p>
    </template>
  </div>
</template>
