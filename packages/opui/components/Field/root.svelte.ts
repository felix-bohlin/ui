import { setFieldRoot } from "./context"

export const provideFieldRoot = (
  endTextId: string,
  invalid: () => boolean | undefined,
) => {
  const parts = $state({ "end-text": 0 })

  setFieldRoot({
    get describedBy() {
      return parts["end-text"] ? endTextId : undefined
    },
    endTextId,
    get invalid() {
      return invalid()
    },
    register(part) {
      parts[part]++
      return () => parts[part]--
    },
  })
}
