export const useFollowLink = () => {
  const router = useRouter()
  return (event: MouseEvent) => {
    const link = event.currentTarget
    if (
      !(link instanceof HTMLAnchorElement) ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    event.preventDefault()
    router.push(link.getAttribute("href") ?? "/")
  }
}
