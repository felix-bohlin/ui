import { createRouter } from "@solidjs/router"
import Chat from "./routes/Chat"
import Feed from "./routes/Feed"
import NotFound from "./routes/NotFound"
import Photos from "./routes/Photos"
import Profile from "./routes/Profile"
import Settings from "./routes/Settings"

export const Router = createRouter({
  routes: [
    { component: Feed, path: "/" },
    { component: Chat, path: "/chat" },
    { component: Photos, path: "/photos" },
    { component: Profile, path: "/u/:handle" },
    { component: Settings, path: "/settings" },
    { component: NotFound, path: "*404" },
  ],
})
