import { useHead } from "@solidjs/web"

export const useTitle = (title: () => string) =>
  useHead(() => ({
    props: { children: `${title()} | Reference` },
    tag: "title",
  }))
