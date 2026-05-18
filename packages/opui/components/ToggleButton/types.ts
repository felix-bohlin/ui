import type { HTMLAttributes } from "vue";

export type Props = {
	[key: string]: any;
	class?: HTMLAttributes["class"];
	disabled?: boolean;
	id?: string;
	label?: string;
	name?: string;
	pressed?: boolean;
	size?: "small" | "x-small";
	type?: "checkbox" | "radio";
	value?: string;
};
