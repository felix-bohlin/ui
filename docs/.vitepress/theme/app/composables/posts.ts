import type { Ref } from "vue";
import { computed, ref } from "vue";
import { useData, useRoute } from "vitepress";
import type { Post } from "./posts.data.ts";
import { data } from "./posts.data.ts";

export default () => {
  const { site } = useData();

  const allPosts: Ref<Post[]> = ref(data);

  const route = useRoute();

  const path = route.path;

  function findCurrentIndex() {
    return allPosts.value.findIndex(
      (p) => `${site.value.base}blog${p.href}` === route.path
    );
  }

  const currentPost = computed(() => allPosts.value[findCurrentIndex()]);
  const nextPost = computed(() => allPosts.value[findCurrentIndex() - 1]);
  const prevPost = computed(() => allPosts.value[findCurrentIndex() + 1]);

  return { allPosts, currentPost, nextPost, prevPost, path };
};
