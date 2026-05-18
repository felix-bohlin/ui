import type { HTMLAttributes } from "vue";

export type Props = {
	[key: string]: any;
	actions?: {
		align?: "end";
	};
	class?: HTMLAttributes["class"];
	closedby?: "any" | "closerequest" | "none";
};
