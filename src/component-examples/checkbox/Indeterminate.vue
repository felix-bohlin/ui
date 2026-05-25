<script setup lang="ts">
import { onMounted } from "vue"
import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "opui-css/vue"

onMounted(() => {
  function setupIndeterminateDemo() {
      document
        .querySelectorAll<HTMLElement>(".indeterminate-demo")
        .forEach((root) => {
          const parent = root.querySelector<HTMLInputElement>(
            '.parent input[type="checkbox"]',
          )
          const children = Array.from(
            root.querySelectorAll<HTMLInputElement>(
              '.child input[type="checkbox"]',
            ),
          )
          if (!parent || children.length === 0) return

          const sync = () => {
            const checkedCount = children.filter((c) => c.checked).length
            parent.checked = checkedCount === children.length
            parent.indeterminate =
              checkedCount > 0 && checkedCount < children.length
          }

          parent.addEventListener("change", () => {
            children.forEach((c) => (c.checked = parent.checked))
            parent.indeterminate = false
          })
          children.forEach((c) => c.addEventListener("change", sync))
          sync()
        })
    }

    setupIndeterminateDemo()
    
})
</script>

<template>
<FieldSet class="indeterminate-demo">
  <FieldLegend>
    <Checkbox class="parent">Select all</Checkbox>
  </FieldLegend>
  <FieldGroup name="indeterminate-children-astro">
    <Checkbox class="child" checked>Apples</Checkbox>
    <Checkbox class="child">Bananas</Checkbox>
    <Checkbox class="child">Cherries</Checkbox>
  </FieldGroup>
</FieldSet>
</template>
