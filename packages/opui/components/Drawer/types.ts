import type { HTMLAttributes } from "vue";

export type Props = {
	[key: string]: any;
	backdrop?: "transparent" | "blurred";
	class?: HTMLAttributes["class"];
	closedby?: "any" | "closerequest" | "none";
	id?: string;
	scrollLock?: boolean;
	side?: "inline-start" | "inline-end" | "block-start" | "block-end";
};

export type DrawerHeaderProps = {
	[key: string]: any;
	class?: HTMLAttributes["class"];
	heading?: string;
};

export type DrawerFooterProps = {
	[key: string]: any;
	class?: HTMLAttributes["class"];
};
