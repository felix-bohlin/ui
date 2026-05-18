import type { HTMLAttributes } from "vue";

export type Props = {
	[key: string]: any;
	bordered?: boolean | "dotted";
	class?: HTMLAttributes["class"];
};
