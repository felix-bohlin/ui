<script lang="ts">
  import "../app.css"
  import { page } from "$app/state"
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
  } from "opui-css/svelte"
  import {
    NOTIFICATIONS,
    SCREENS,
    me,
    unreadNotifications,
    type ChatLine,
  } from "reference-shared"
  import { onMount } from "svelte"
  import { setSent } from "#lib/chat.svelte.ts"
  import Icon from "#lib/Icon.svelte"

  let { children } = $props()

  const user = me()
  const unread = unreadNotifications()
  const sent: Record<string, ChatLine[]> = $state({})
  setSent(sent)

  const isCurrent = (path: string) =>
    path === "/"
      ? page.url.pathname === "/"
      : page.url.pathname === path || page.url.pathname.startsWith(`${path}/`)

  const setTheme = (theme: string) => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem("reference-theme", theme)
    } catch {}
  }

  onMount(() => {
    document.documentElement.dataset.hydrated = ""
  })
</script>

<a class="ui-sr-only ui-focusable" href="#main">Skip to content</a>
<header class="app-header">
  <Button
    aria-label="Menu"
    class="app-menu-button"
    command="show-modal"
    commandfor="nav-drawer"
  >
    <Icon name="menu" />
  </Button>
  <a class="app-brand" href="/">Reference</a>
  <nav aria-label="Main" class="app-nav">
    {#each SCREENS as screen (screen.id)}
      <Button
        aria-current={isCurrent(screen.path) ? "page" : undefined}
        href={screen.path}>{screen.label}</Button
      >
    {/each}
  </nav>
  <Badge hideLabel label="{unread} unread notifications">
    <Button
      aria-label="Notifications"
      command="toggle-popover"
      commandfor="notifications-menu"
    >
      <Icon name="bell" />
    </Button>
    {#snippet indicator()}{unread}{/snippet}
  </Badge>
  <Menu
    align="end"
    id="notifications-menu"
    items={NOTIFICATIONS.map(({ href, text }) => ({ href, label: text }))}
  />
  <Button aria-label="Theme" command="toggle-popover" commandfor="theme-menu">
    <Icon name="palette" />
  </Button>
  <Menu
    align="end"
    id="theme-menu"
    items={[
      { label: "Default", onclick: () => setTheme("default") },
      { label: "Sunset", onclick: () => setTheme("sunset") },
    ]}
  />
  <Avatar href="/u/{user.handle}" label="Your profile" size="small"
    >{user.initials}</Avatar
  >
</header>
<Drawer closeOnNavigate id="nav-drawer">
  <DrawerHeader closeButton>
    <DrawerTitle>Navigate</DrawerTitle>
  </DrawerHeader>
  <DrawerContent>
    <List variant="transparent">
      {#each SCREENS as screen (screen.id)}
        <ListItem
          aria-current={isCurrent(screen.path) ? "page" : undefined}
          href={screen.path}
          label={screen.label}
        />
      {/each}
    </List>
  </DrawerContent>
</Drawer>
<main class="app-main" id="main" tabindex="-1">
  {@render children()}
</main>
