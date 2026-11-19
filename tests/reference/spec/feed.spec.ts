import { POSTS } from "../shared/data.ts"
import { PAGE_SIZE } from "../shared/fake-api.ts"
import { expect, expectNoAxeViolations, open, test } from "./fixtures.ts"
import { KNOWN } from "./known.ts"

const posts = (page: import("@playwright/test").Page) =>
  page.getByRole("list", { name: "Posts" }).getByRole("article")

const postBy = (page: import("@playwright/test").Page, name: string) =>
  posts(page).filter({ has: page.getByRole("heading", { name }) })

test.beforeEach(async ({ page }) => {
  await open(page, "/")
})

test("the composer adds a post at the top and empties the field", async ({
  page,
}) => {
  const field = page.getByRole("textbox", { name: "What's on your mind?" })
  await expect(page.locator(".ui-textarea opui-character-count")).toHaveText(
    "0/280",
  )
  await page.getByRole("button", { name: "Post", exact: true }).click()
  await expect(posts(page)).toHaveCount(PAGE_SIZE)
  await field.fill("Testing the composer")
  await expect(page.locator(".ui-textarea opui-character-count")).toHaveText(
    "20/280",
  )
  await page.getByRole("button", { name: "Post", exact: true }).click()
  await expect(posts(page)).toHaveCount(PAGE_SIZE + 1)
  const first = posts(page).first()
  await expect(first).toContainText("Testing the composer")
  await expect(first).toContainText("Just now")
  await expect(first.getByRole("heading")).toHaveText("Sam Rivera")
  await expect(field).toHaveValue("")
})

test("the character count follows the field when the app empties it", async ({
  page,
}) => {
  test.fail(
    ["nuxt", "solid", "sveltekit"].includes(test.info().project.name),
    `${KNOWN.characterCount}. Astro and Next empty the field with form.reset(), which the element follows`,
  )
  const count = page.locator(".ui-textarea opui-character-count")
  await page
    .getByRole("textbox", { name: "What's on your mind?" })
    .fill("Testing the composer")
  await expect(count).toHaveText("20/280")
  await page.getByRole("button", { name: "Post", exact: true }).click()
  await expect(
    page.getByRole("textbox", { name: "What's on your mind?" }),
  ).toHaveValue("")
  await expect(count).toHaveText("0/280")
})

test("each post is an article named by its author", async ({ page }) => {
  await expect(posts(page)).toHaveCount(PAGE_SIZE)
  const first = POSTS[0]!
  const article = page.getByRole("article", { name: "Holly Humbucker" }).first()
  await expect(article).toContainText(first.text)
  await expect(article.locator("time")).toHaveAttribute(
    "datetime",
    first.datetime,
  )
  await expect(
    article.getByRole("link", { name: "Holly Humbucker" }),
  ).toHaveAttribute("href", "/u/holly")
  await expect(article.locator("header .ui-avatar")).toHaveCount(1)
  await expect(article.locator("a.ui-avatar")).toHaveCount(0)
  await expect(article.locator("header .ui-avatar img")).toHaveAttribute(
    "alt",
    "",
  )
})

test("a reaction adds one to its count", async ({ page }) => {
  const article = postBy(page, "Holly Humbucker").first()
  const like = article.getByRole("checkbox", { name: "Like 12" })
  await like.check({ force: true })
  await expect(article.getByRole("checkbox", { name: "Like 13" })).toBeChecked()
  await article.getByRole("checkbox", { name: "Like 13" }).uncheck({
    force: true,
  })
  await expect(
    article.getByRole("checkbox", { name: "Like 12" }),
  ).not.toBeChecked()
})

test("load more fetches the next pages, then says you're caught up", async ({
  page,
}) => {
  const list = page.getByRole("list", { name: "Posts" })
  const more = page.getByRole("button", { name: "Load more" })
  await more.click()
  await expect(list).toHaveAttribute("aria-busy", "true")
  await expect(more).toBeDisabled()
  await expect(posts(page)).toHaveCount(PAGE_SIZE * 2)
  await expect(list).not.toHaveAttribute("aria-busy", "true")
  await more.click()
  await expect(posts(page)).toHaveCount(POSTS.length)
  await expect(more).toBeHidden()
  await expect(page.getByText("You're all caught up.")).toBeVisible()
})

test("the filters show posts with photos, and saved posts", async ({
  page,
}) => {
  const filters = page.getByRole("radiogroup", { name: "Filter posts" })
  await expect(filters.getByRole("radio", { name: "All" })).toBeChecked()
  await filters.getByRole("radio", { name: "Photos" }).check({ force: true })
  await expect(posts(page)).toHaveCount(
    POSTS.filter((post) => post.photos.length).length,
  )
  for (const image of await posts(page).locator(".app-post-photos img").all()) {
    await expect(image).toHaveAttribute("alt", /\w/)
  }
  await expect(page.getByRole("button", { name: "Load more" })).toBeHidden()
  await filters.getByRole("radio", { name: "Saved" }).check({ force: true })
  await expect(page.getByText("No saved posts yet.")).toBeVisible()
  await expect(posts(page)).toHaveCount(0)
})

test("Save post closes the menu", async ({ page }) => {
  await page
    .getByRole("button", { name: "Options for Lou Headstock's post" })
    .click()
  const menu = page.locator("#post-menu-p10")
  await menu.getByRole("button", { name: "Save post" }).click()
  await expect(menu).toBeHidden({ timeout: 1000 })
})

test("Save post submits a form and saves the post", async ({ page }) => {
  await page
    .getByRole("button", { name: "Options for Lou Headstock's post" })
    .click()
  const menu = page.locator("#post-menu-p10")
  await expect(menu).toBeVisible()
  await menu.getByRole("button", { name: "Save post" }).click()
  await page.keyboard.press("Escape")
  await expect(menu).toBeHidden()
  await page
    .getByRole("radiogroup", { name: "Filter posts" })
    .getByRole("radio", { name: "Saved" })
    .check({ force: true })
  await expect(posts(page)).toHaveCount(1)
  await expect(posts(page).first()).toContainText("rehearsal room")
  await page
    .getByRole("button", { name: "Options for Lou Headstock's post" })
    .click()
  await expect(
    menu.getByRole("button", { name: "Remove from saved" }),
  ).toBeVisible()
})

test("Hide post removes the post", async ({ page }) => {
  await page
    .getByRole("button", { name: "Options for Holly Humbucker's post" })
    .first()
    .click()
  await page
    .locator("#post-menu-p12")
    .getByRole("button", { name: "Hide post" })
    .click()
  await expect(page.locator("#post-menu-p12")).toHaveCount(0)
  await expect(posts(page)).toHaveCount(PAGE_SIZE - 1)
  await expect(page.getByText(POSTS[0]!.text)).toHaveCount(0)
})

test("Hide post moves focus to the next post", async ({ page }) => {
  await page
    .getByRole("button", { name: "Options for Holly Humbucker's post" })
    .first()
    .click()
  await page
    .locator("#post-menu-p12")
    .getByRole("button", { name: "Hide post" })
    .click()
  await expect(
    posts(page).first().getByRole("link", { name: "Ada Okafor" }),
  ).toBeFocused()
})

test("Hide post on the last post moves focus to the post before it", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Options for Percy Groove's post" })
    .click()
  await page
    .locator("#post-menu-p8")
    .getByRole("button", { name: "Hide post" })
    .click()
  await expect(
    posts(page).last().getByRole("link", { name: "Sam Rivera" }),
  ).toBeFocused()
})

test("the last Load more moves focus to the end of the list", async ({
  page,
}) => {
  const more = page.getByRole("button", { name: "Load more" })
  await more.click()
  await expect(posts(page)).toHaveCount(PAGE_SIZE * 2)
  await more.click()
  await expect(page.getByText("You're all caught up.")).toBeFocused()
})

test("Copy link writes the post's link to the clipboard", async ({
  context,
  page,
  baseURL,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await page
    .getByRole("button", { name: "Options for Ada Okafor's post" })
    .first()
    .click()
  await page
    .locator("#post-menu-p11")
    .getByRole("button", { name: "Copy link" })
    .click()
  await expect(page.locator("#post-menu-p11")).toBeHidden()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    `${baseURL}/posts/p11`,
  )
})

test("an open post menu passes axe", async ({ page }) => {
  await page
    .getByRole("button", { name: "Options for Holly Humbucker's post" })
    .first()
    .click()
  await expect(page.locator("#post-menu-p12")).toBeVisible()
  await expectNoAxeViolations(page)
})
