import { useLocation } from "@solidjs/router"
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  List,
  ListItem,
  Menu,
} from "opui-css/solid"
import {
  NOTIFICATIONS,
  SCREENS,
  me,
  unreadNotifications,
} from "reference-shared"
import type { JSX } from "@solidjs/web"
import { For, onSettled } from "solid-js"
import Icon from "./lib/Icon"
import { SentMessages } from "./lib/chat"

const THEME_KEY = "reference-theme"

export default function Shell(props: { children?: JSX.Element }) {
  const location = useLocation()
  const user = me()
  const unread = unreadNotifications()

  const isCurrent = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(`${path}/`)

  const setTheme = (theme: string) => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {}
  }

  const focusMain = () => document.getElementById("main")?.focus()

  onSettled(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY)
      if (saved) document.documentElement.dataset.theme = saved
    } catch {}
    document.documentElement.dataset.hydrated = ""
  })

  return (
    <SentMessages>
      <a class="ui-sr-only ui-focusable" href="#main" onClick={focusMain}>
        Skip to content
      </a>
      <header class="app-header">
        <Button
          aria-label="Menu"
          class="app-menu-button"
          command="show-modal"
          commandfor="nav-drawer"
        >
          <Icon name="menu" />
        </Button>
        <a class="app-brand" href="/">
          Reference
        </a>
        <nav aria-label="Main" class="app-nav">
          <For each={SCREENS}>
            {(screen) => (
              <Button
                aria-current={isCurrent(screen.path) ? "page" : undefined}
                href={screen.path}
              >
                {screen.label}
              </Button>
            )}
          </For>
        </nav>
        <Badge
          hideLabel
          indicator={unread}
          label={`${unread} unread notifications`}
        >
          <Button
            aria-label="Notifications"
            command="toggle-popover"
            commandfor="notifications-menu"
          >
            <Icon name="bell" />
          </Button>
        </Badge>
        <Menu
          align="end"
          id="notifications-menu"
          items={NOTIFICATIONS.map(({ href, text }) => ({ href, label: text }))}
        />
        <Button
          aria-label="Theme"
          command="toggle-popover"
          commandfor="theme-menu"
        >
          <Icon name="palette" />
        </Button>
        <Menu
          align="end"
          id="theme-menu"
          items={[
            { label: "Default", onClick: () => setTheme("default") },
            { label: "Sunset", onClick: () => setTheme("sunset") },
          ]}
        />
        <Avatar
          aria-label="Your profile"
          href={`/u/${user.handle}`}
          size="small"
        >
          {user.initials}
        </Avatar>
      </header>
      <Drawer closeOnNavigate id="nav-drawer">
        <DrawerHeader closeButton>
          <DrawerTitle>Navigate</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <List variant="transparent">
            <For each={SCREENS}>
              {(screen) => (
                <ListItem
                  aria-current={isCurrent(screen.path) ? "page" : undefined}
                  href={screen.path}
                  label={screen.label}
                />
              )}
            </For>
          </List>
        </DrawerContent>
      </Drawer>
      <main class="app-main" id="main" tabindex="-1">
        {props.children}
      </main>
    </SentMessages>
  )
}
