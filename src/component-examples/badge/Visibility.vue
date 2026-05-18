<script setup lang="ts">
import { onMounted } from "vue"
import { Badge } from "opui-css/vue"

onMounted(() => {
  function setupBadgeVisibilityControls() {
      const toggles = document.querySelectorAll(
        "#badge-visibility-toggle",
      ) as NodeListOf<HTMLInputElement>

      const badges = new Set<Element>()
      toggles.forEach((toggle) => {
        const container = toggle.closest(".example-container")
        if (!container) return
        container.querySelectorAll(".badge").forEach((b) => badges.add(b))
      })

      function updateBadges(checked: boolean) {
        badges.forEach((badge) => {
          badge.classList.toggle("invisible", checked)
        })

        toggles.forEach((t) => {
          if (t.checked !== checked) {
            t.checked = checked
          }
        })
      }

      toggles.forEach((toggle) => {
        toggle.addEventListener("change", () => updateBadges(toggle.checked))
      })

      if (toggles.length > 0) {
        updateBadges(toggles[0].checked)
      }
    }

    setupBadgeVisibilityControls()
    
})
</script>

<template>
<Badge label="5" invisible>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>

<Badge dot invisible>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
</template>
