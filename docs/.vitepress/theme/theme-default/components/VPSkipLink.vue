<script lang="ts" setup>
import { ref, watch } from "vue"
import { useRoute } from "vitepress"

const route = useRoute()
const backToTop = ref()

watch(
  () => route.path,
  () => backToTop.value.focus(),
)

function focusOnTargetAnchor({ target }: Event) {
  const el = document.getElementById(
    decodeURIComponent((target as HTMLAnchorElement).hash).slice(1),
  )

  if (el) {
    const removeTabIndex = () => {
      el.removeAttribute("tabindex")
      el.removeEventListener("blur", removeTabIndex)
    }

    el.setAttribute("tabindex", "-1")
    el.addEventListener("blur", removeTabIndex)
    el.focus()
    window.scrollTo(0, 0)
  }
}
</script>

<template>
  <span ref="backToTop" tabindex="-1" />
  <a
    href="#VPContent"
    class="VPSkipLink visually-hidden"
    @click="focusOnTargetAnchor"
  >
    Skip to content
  </a>
</template>

<style scoped>
.VPSkipLink {
  top: 8px;
  inset-inline-start: 8px;
  padding: 8px 16px;
  z-index: 999;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  color: var(--primary);
  box-shadow: var(
    --shadow-3,
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1)
  );
  background-color: var(--vp-c-bg);
}

.VPSkipLink:focus {
  height: auto;
  width: auto;
  clip: auto;
  clip-path: none;
}

@media (min-width: 1280px) {
  .VPSkipLink {
    top: 14px;
    inset-inline-start: 16px;
  }
}
</style>
