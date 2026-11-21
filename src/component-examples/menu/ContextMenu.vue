<script setup lang="ts">
import { ref } from "vue"
import { ListItem, Menu } from "opui-css/vue"

const point = ref<HTMLSpanElement>()

function open(event: MouseEvent) {
  event.preventDefault()
  const menu = document.getElementById("menu-context-menu-1")
  const target = event.currentTarget
  if (!menu || !point.value || !(target instanceof HTMLElement)) return
  const box = target.getBoundingClientRect()
  const x = Math.min(Math.max(event.clientX - box.left, 0), box.width)
  const y = Math.min(Math.max(event.clientY - box.top, 0), box.height)
  const source = point.value
  source.style.left = `${x}px`
  source.style.top = `${y}px`
  const show = () => {
    if (menu.matches(":popover-open")) menu.hidePopover()
    menu.showPopover({ source })
  }
  if (event.buttons) {
    document.addEventListener("pointerup", () => setTimeout(show), {
      once: true,
    })
  } else {
    show()
  }
}
</script>

<template>
  <div
    class="menu-context-target"
    id="menu-context-menu-1-target"
    tabindex="0"
    @contextmenu="open"
  >
    Right-click here, or focus the box and press Shift+F10.
    <span
      ref="point"
      class="menu-context-point"
      id="menu-context-menu-1-point"
    ></span>
  </div>
  <Menu id="menu-context-menu-1">
    <ListItem
      as="button"
      command="hide-popover"
      commandfor="menu-context-menu-1"
      label="Cut"
    />
    <ListItem
      as="button"
      command="hide-popover"
      commandfor="menu-context-menu-1"
      label="Copy"
    />
    <ListItem
      as="button"
      command="hide-popover"
      commandfor="menu-context-menu-1"
      label="Paste"
    />
  </Menu>
</template>

<style>
.menu-context-target {
  align-content: center;
  block-size: 10rem;
  border: var(--ui-border-width) dashed var(--ui-border-color);
  border-radius: var(--ui-radius);
  inline-size: 100%;
  padding: var(--ui-space-3);
  position: relative;
  text-align: center;
}

.menu-context-point {
  position: absolute;
}
</style>
