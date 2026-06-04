<script setup lang="ts">
import { onMounted } from "vue"
import { List } from "opui-css/vue"

onMounted(() => {
  function setupListDenseControls() {
    const toggles = document.querySelectorAll(
      ".list-dense-toggle input",
    ) as NodeListOf<HTMLInputElement>
    const lists = document.querySelectorAll(".list-dense-target")

    function updateList(checked: boolean) {
      lists.forEach((list) => {
        if (checked) {
          list.classList.add("dense")
        } else {
          list.classList.remove("dense")
        }
      })

      toggles.forEach((t) => {
        if (t.checked !== checked) {
          t.checked = checked
        }
      })
    }

    toggles.forEach((toggle) => {
      toggle.addEventListener("change", () => updateList(toggle.checked))
    })

    if (toggles.length > 0) {
      updateList(toggles[0].checked)
    }
  }

  setupListDenseControls()
})
</script>

<template>
  <List dense class="list-dense-target">
    <ListAll prefix="dense-" />
  </List>
</template>
