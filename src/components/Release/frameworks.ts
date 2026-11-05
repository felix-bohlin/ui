import { FRAMEWORKS } from "../../utils/framework"

export const RELEASED_FRAMEWORKS = FRAMEWORKS.filter(({ id }) => id !== "solid")
