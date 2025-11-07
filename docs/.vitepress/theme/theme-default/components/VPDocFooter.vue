<script setup lang="ts">
import { computed } from "vue"
import { useData } from "../composables/data"
import { useEditLink } from "../composables/edit-link"
import { usePrevNext } from "../composables/prev-next"
import VPLink from "./VPLink.vue"
import VPDocFooterLastUpdated from "./VPDocFooterLastUpdated.vue"

const { theme, page, site, frontmatter } = useData()

const editLink = useEditLink()
const control = usePrevNext()

const hasEditLink = computed(
  () => theme.value.editLink && frontmatter.value.editLink !== false,
)
const hasLastUpdated = computed(() => page.value.lastUpdated)
const showFooter = computed(
  () =>
    hasEditLink.value ||
    hasLastUpdated.value ||
    control.value.prev ||
    control.value.next,
)
</script>

<template>
  <footer v-if="showFooter" class="VPDocFooter">
    <slot name="doc-footer-before" />

    <div v-if="hasEditLink || hasLastUpdated" class="edit-info">
      <div v-if="hasEditLink" class="edit-link">
        <VPLink class="edit-link-button" :href="editLink.url" :no-icon="true">
          <span class="vpi-square-pen edit-link-icon" />
          {{ editLink.text }}
        </VPLink>
      </div>

      <div v-if="hasLastUpdated" class="last-updated">
        <VPDocFooterLastUpdated />
      </div>

      <a
        class="edit-link-button"
        v-if="site?.themeConfig?.socialLinks"
        :href="
          site?.themeConfig?.socialLinks?.find((item) => item.icon === 'github')
            ?.link
        "
        target="_blank"
        ><span class="vpi-social-github"></span>Go to repo</a
      >
    </div>

    <nav
      v-if="control.prev?.link || control.next?.link"
      class="prev-next"
      aria-labelledby="doc-footer-aria-label"
    >
      <span class="visually-hidden" id="doc-footer-aria-label">Pager</span>

      <div class="pager">
        <VPLink
          v-if="control.prev?.link"
          class="pager-link prev"
          :href="control.prev.link"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.prev || 'Previous page'"
          ></span>
          <span class="title" v-html="control.prev.text"></span>
        </VPLink>
      </div>
      <div class="pager">
        <VPLink
          v-if="control.next?.link"
          class="pager-link next"
          :href="control.next.link"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.next || 'Next page'"
          ></span>
          <span class="title" v-html="control.next.text"></span>
        </VPLink>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
.vpi-social-github {
  margin-inline-end: 0.5em;
}
.VPDocFooter {
  margin-block-start: 64px;
}

.edit-info {
  padding-block-end: 18px;
}

@media (min-width: 640px) {
  .edit-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block-end: 14px;
  }
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--primary);
  transition: color 0.25s;
  text-decoration: none;
}

.edit-link-button:hover {
  color: var(--primary-light);
}

.edit-link-icon {
  margin-inline-end: 8px;
}

.prev-next {
  border-top: 1px solid var(--vp-c-divider);
  padding-block-start: 24px;
  display: grid;
  grid-row-gap: 8px;
}

@media (min-width: 640px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}

.pager-link {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--surface-border-radius, 0.25rem);
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
  text-decoration: none;
}

.pager-link:hover {
  border-color: var(--primary);
}

.pager-link.next {
  margin-inline-start: auto;
  text-align: end;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-color-2-78);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--primary);
  transition: color 0.25s;
}
</style>
