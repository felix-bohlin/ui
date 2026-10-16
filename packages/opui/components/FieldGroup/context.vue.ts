import type { InjectionKey, Ref } from "vue"

export const FieldGroupKey = Symbol() as InjectionKey<
  Readonly<Ref<string | undefined>>
>
