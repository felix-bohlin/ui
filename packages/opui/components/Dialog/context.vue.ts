import type { InjectionKey, Ref } from "vue"

export const DialogKey = Symbol() as InjectionKey<
  Readonly<Ref<string | undefined>>
>
