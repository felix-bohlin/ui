export const posts = [
  {
    date: "2026-10-01",
    description:
      "Menu, Carousel, Button without IconButton, and everything else from three days of branches.",
    slug: "new-components-and-fixes",
    title: "Menu, Carousel and one Button",
  },
].toSorted((a, b) => a.date.localeCompare(b.date))

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "long" })

export const formatDate = (date: string) => dateFormat.format(new Date(date))
