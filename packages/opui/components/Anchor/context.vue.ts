import type { InjectionKey } from "vue"
import type { Context } from "./types"

export const AnchorKey = Symbol() as InjectionKey<Context>
