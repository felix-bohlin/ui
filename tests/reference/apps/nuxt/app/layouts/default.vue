<script setup lang="ts">
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
} from "opui-css/vue"
import {
  NOTIFICATIONS,
  SCREENS,
  me,
  unreadNotifications,
} from "reference-shared"

const route = useRoute()
const followLink = useFollowLink()
const user = me()
const unread = unreadNotifications()

const isCurrent = (path: string) =>
  path === "/"
    ? route.path === "/"
    : route.path === path || route.path.startsWith(`${path}/`)

const setTheme = (theme: string) => {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem("reference-theme", theme)
  } catch {}
}

const notifications = NOTIFICATIONS.map(({ href, text }) => ({
  href,
  label: text,
  onClick: followLink,
}))

const themes = [
  { label: "Default", onClick: () => setTheme("default") },
  { label: "Sunset", onClick: () => setTheme("sunset") },
]

onMounted(() => {
  try {
    const saved = localStorage.getItem("reference-theme")
    if (saved) document.documentElement.dataset.theme = saved
  } catch {}
  document.documentElement.dataset.hydrated = ""
})
</script>

<template>
  <a class="ui-sr-only ui-focusable" href="#main">Skip to content</a>
  <header class="app-header">
    <Button
      aria-label="Menu"
      class="app-menu-button"
      command="show-modal"
      commandfor="nav-drawer"
    >
      <AppIcon name="menu" />
    </Button>
    <NuxtLink v-slot="{ navigate }" custom to="/">
      <a class="app-brand" href="/" @click="navigate">Reference</a>
    </NuxtLink>
    <nav aria-label="Main" class="app-nav">
      <NuxtLink
        v-for="screen in SCREENS"
        :key="screen.id"
        v-slot="{ navigate }"
        custom
        :to="screen.path"
      >
        <Button
          :aria-current="isCurrent(screen.path) ? 'page' : undefined"
          :href="screen.path"
          @click="navigate"
          >{{ screen.label }}</Button
        >
      </NuxtLink>
    </nav>
    <Badge hideLabel :label="`${unread} unread notifications`">
      <Button
        aria-label="Notifications"
        command="toggle-popover"
        commandfor="notifications-menu"
      >
        <AppIcon name="bell" />
      </Button>
      <template #indicator>{{ unread }}</template>
    </Badge>
    <Menu align="end" id="notifications-menu" :items="notifications" />
    <Button aria-label="Theme" command="toggle-popover" commandfor="theme-menu">
      <AppIcon name="palette" />
    </Button>
    <Menu align="end" id="theme-menu" :items="themes" />
    <NuxtLink v-slot="{ navigate }" custom :to="`/u/${user.handle}`">
      <Avatar
        aria-label="Your profile"
        :href="`/u/${user.handle}`"
        size="small"
        @click="navigate"
        >{{ user.initials }}</Avatar
      >
    </NuxtLink>
  </header>
  <Drawer closeOnNavigate id="nav-drawer">
    <DrawerHeader closeButton>
      <DrawerTitle>Navigate</DrawerTitle>
    </DrawerHeader>
    <DrawerContent>
      <List variant="transparent">
        <NuxtLink
          v-for="screen in SCREENS"
          :key="screen.id"
          v-slot="{ navigate }"
          custom
          :to="screen.path"
        >
          <ListItem
            :aria-current="isCurrent(screen.path) ? 'page' : undefined"
            :href="screen.path"
            :label="screen.label"
            @click="navigate"
          />
        </NuxtLink>
      </List>
    </DrawerContent>
  </Drawer>
  <main class="app-main" id="main" tabindex="-1">
    <slot />
  </main>
</template>
