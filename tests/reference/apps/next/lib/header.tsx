"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
} from "opui-css/react"
import {
  NOTIFICATIONS,
  SCREENS,
  me,
  unreadNotifications,
} from "reference-shared"
import Icon from "./icon"

const user = me()
const unread = unreadNotifications()

const setTheme = (theme: string) => {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem("reference-theme", theme)
  } catch {}
}

export default function Header() {
  const pathname = usePathname()
  const current = (path: string) =>
    (
      path === "/"
        ? pathname === "/"
        : pathname === path || pathname.startsWith(`${path}/`)
    )
      ? "page"
      : undefined

  return (
    <>
      <header className="app-header">
        <Button
          aria-label="Menu"
          className="app-menu-button"
          command="show-modal"
          commandfor="nav-drawer"
        >
          <Icon name="menu" />
        </Button>
        <Link className="app-brand" href="/">
          Reference
        </Link>
        <nav aria-label="Main" className="app-nav">
          {SCREENS.map((screen) => (
            <Button
              aria-current={current(screen.path)}
              href={screen.path}
              key={screen.id}
            >
              {screen.label}
            </Button>
          ))}
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
        <Avatar href={`/u/${user.handle}`} label="Your profile" size="small">
          {user.initials}
        </Avatar>
      </header>
      <Drawer closeOnNavigate id="nav-drawer">
        <DrawerHeader closeButton>
          <DrawerTitle>Navigate</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <List variant="transparent">
            {SCREENS.map((screen) => (
              <ListItem
                aria-current={current(screen.path)}
                href={screen.path}
                key={screen.id}
                label={screen.label}
              />
            ))}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  )
}
