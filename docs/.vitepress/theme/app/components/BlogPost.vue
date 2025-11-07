<script setup lang="ts">
import { useData } from "vitepress";
import type { Post } from "../composables/posts.data";

defineProps<{
  post: Post;
}>();
const { site } = useData();
</script>

<template>
  <a :href="`${site.base}blog${post.href}`">
    <article class="card outlined">
      <hgroup>
        <p>{{ post.date.since }}</p>
        <h2 class="h5">{{ post.title }}</h2>
        <p v-html="post.excerpt" />
      </hgroup>

      <div class="content">
        <div class="chip" v-for="tag in post.tags">{{ tag }}</div>
      </div>

      <footer class="actions">
        <div class="button small">Read more</div>
      </footer>
    </article>
  </a>
</template>

<style scoped>
.content {
  display: flex;
  flex-flow: wrap;
  gap: var(--size-2);
}

a {
  color: var(--text-1);
  font-weight: var(--font-weight-4);
  text-decoration: none;

  .link {
    text-decoration: none;
  }

  &:hover {
    border-radius: var(--surface-border-radius, 0.25rem);
    outline: 1px solid var(--primary);
    .link {
      text-decoration: underline;
    }
  }
}
</style>
