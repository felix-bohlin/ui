import { type FeedFilter, feedPage, fetchFeedPage } from "reference-shared"

const TEMPLATE_ID = "new-post-template"

let state = {
  created: 0,
  filter: "all" as FeedFilter,
  hasMore: false,
  loaded: new Set<string>(),
  loading: false,
  page: 0,
  saved: new Set<string>(),
}

const screen = () => document.querySelector<HTMLElement>('[data-screen="feed"]')

const items = (root: HTMLElement) =>
  [...root.querySelectorAll<HTMLLIElement>(".app-posts > li")].map((li) => ({
    created: li.dataset.created !== undefined,
    id: li.querySelector<HTMLElement>("[data-post]")!.dataset.post!,
    li,
    photos: li.dataset.photos !== undefined,
  }))

const render = () => {
  const root = screen()
  if (!root) return
  const { filter, hasMore, loaded, loading, saved } = state
  let shown = 0
  for (const item of items(root)) {
    const visible =
      filter === "photos"
        ? item.photos
        : filter === "saved"
          ? saved.has(item.id)
          : item.created || loaded.has(item.id)
    item.li.hidden = !visible
    if (visible) shown += 1
    const label = item.li.querySelector('[data-post-action="save"] .ui-text p')
    if (label)
      label.textContent = saved.has(item.id) ? "Remove from saved" : "Save post"
  }
  const list = root.querySelector<HTMLOListElement>(".app-posts")!
  list.hidden = shown === 0
  if (loading) list.setAttribute("aria-busy", "true")
  else list.removeAttribute("aria-busy")
  root.querySelector<HTMLElement>("[data-feed-empty]")!.hidden = !(
    shown === 0 && filter === "saved"
  )
  const more = root.querySelector<HTMLElement>("[data-load-more]")!
  more.hidden = !(filter === "all" && hasMore)
  more.querySelector("button")!.disabled = loading
  root.querySelector<HTMLElement>("[data-feed-end]")!.hidden = !(
    filter === "all" && !hasMore
  )
}

const init = () => {
  if (!screen()) return
  const first = feedPage(0)
  state = {
    created: 0,
    filter: "all",
    hasMore: first.hasMore,
    loaded: new Set(first.posts.map((post) => post.id)),
    loading: false,
    page: 0,
    saved: new Set(),
  }
  render()
}

const loadMore = async () => {
  const current = state
  current.loading = true
  render()
  const next = await fetchFeedPage(current.page + 1)
  if (current !== state) return
  current.page += 1
  current.loaded = new Set(next.posts.map((post) => post.id))
  current.hasMore = next.hasMore
  current.loading = false
  render()
}

const addPost = (form: HTMLFormElement) => {
  const root = screen()!
  const text = String(new FormData(form).get("text") ?? "")
  const template = root.querySelector<HTMLTemplateElement>(
    "template[data-new-post]",
  )!
  state.created += 1
  const id = `new-${state.created}`
  const holder = document.createElement("template")
  holder.innerHTML = template.innerHTML.replaceAll(TEMPLATE_ID, id)
  const li = holder.content.querySelector("li")!
  li.dataset.created = ""
  li.querySelector("[data-post-text]")!.textContent = text
  root.querySelector(".app-posts")!.prepend(li)
  form.reset()
  render()
}

document.addEventListener("astro:page-load", init)

document.addEventListener(
  "submit",
  (event) => {
    const form = event.target as HTMLFormElement
    if (!screen()?.contains(form)) return
    if (form.matches("[data-composer]")) {
      event.preventDefault()
      addPost(form)
    } else if (form.dataset.savePost) {
      event.preventDefault()
      const id = form.dataset.savePost
      if (state.saved.has(id)) state.saved.delete(id)
      else state.saved.add(id)
      render()
    }
  },
  true,
)

document.addEventListener("click", (event) => {
  const root = screen()
  const target = event.target as Element
  if (!root?.contains(target)) return
  if (target.closest("[data-load-more] button")) {
    void loadMore()
    return
  }
  const action = target.closest<HTMLElement>("[data-post-action]")
  if (!action) return
  const article = action.closest<HTMLElement>("[data-post]")!
  const id = article.dataset.post!
  if (action.dataset.postAction === "copy") {
    void navigator.clipboard.writeText(`${location.origin}/posts/${id}`)
  } else if (action.dataset.postAction === "hide") {
    article.closest("li")!.remove()
    state.saved.delete(id)
    render()
  }
})

document.addEventListener("change", (event) => {
  const input = event.target as HTMLInputElement
  const root = screen()
  if (!root?.contains(input)) return
  if (input.name === "filter") {
    state.filter = input.value as FeedFilter
    render()
    return
  }
  const count = input
    .closest(".ui-toggle-button")
    ?.querySelector<HTMLElement>("[data-count]")
  if (count && input.closest('[aria-label="Reactions"]')) {
    count.textContent = String(
      Number(count.dataset.count) + (input.checked ? 1 : 0),
    )
  }
})
