import type { HTMLAttributes } from "vue";

export type Props = {
	[key: string]: any;
	bordered?: boolean;
	class?: HTMLAttributes["class"];
	dense?: boolean;
	gutterless?: boolean;
	variant?: "default" | "tonal" | "transparent";
};
