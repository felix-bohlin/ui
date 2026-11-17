/** @jsxImportSource @solidjs/web */
import { ListItem, Menu } from "opui-css/solid"

export default function ContextMenu() {
  let point: HTMLSpanElement | undefined

  function open(event: MouseEvent & { currentTarget: HTMLDivElement }) {
    event.preventDefault()
    const menu = document.getElementById("menu-context-menu-1")
    if (!menu || !point) return
    const box = event.currentTarget.getBoundingClientRect()
    const x = Math.min(Math.max(event.clientX - box.left, 0), box.width)
    const y = Math.min(Math.max(event.clientY - box.top, 0), box.height)
    const source = point
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

  return (
    <>
      <div
        class="menu-context-target"
        id="menu-context-menu-1-target"
        onContextMenu={open}
        tabindex="0"
      >
        Right-click here, or focus the box and press Shift+F10.
        <span
          class="menu-context-point"
          id="menu-context-menu-1-point"
          ref={(element: HTMLSpanElement) => (point = element)}
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
      <style>{`
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
      `}</style>
    </>
  )
}
