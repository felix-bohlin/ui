---
aside: false
---

<script setup lang="ts">
import Post from "../.vitepress/theme/app/components/BlogPost.vue"
import usePosts from '../.vitepress/theme/app/composables/posts'

const { allPosts: posts } = usePosts();
</script>

<hgroup>
<p>Blog</p>
<h1>Developer blog</h1>
<p>Irregular devlog from the work on Open Props UI.</p>
</hgroup>

<div class="posts not-rich-text">
	<Post v-for="post of posts" :post="post" />
</div>

<style>
	.posts {
		display:grid;
		gap: var(--size-3);
		margin-block-start: var(--size-8);
	}
</style>
