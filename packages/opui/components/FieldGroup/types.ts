import type { HTMLAttributes, InjectionKey } from 'vue'

export type FieldGroupProps = {
  [key: string]: any
  class?: HTMLAttributes['class']
  direction?: 'row' | 'column'
  name?: string
}

export const CurrentFieldNameKey = Symbol() as InjectionKey<string>
