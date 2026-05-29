import type { HTMLAttributes } from "astro/types";
import type * as Base from "./types";

export type Props = Base.Props & HTMLAttributes<"progress">;
