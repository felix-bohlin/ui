import type { HTMLAttributes } from "vue";

export type Props = {
	[key: string]: any;
	actionsAlign?: "start" | "end";
	class?: HTMLAttributes["class"];
	closedby?: "any" | "closerequest" | "none";
};
