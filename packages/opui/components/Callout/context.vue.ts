import type { InjectionKey } from "vue"
import type { Props } from "./types"

export const CalloutKey = Symbol() as InjectionKey<Pick<Props, "severity">>
