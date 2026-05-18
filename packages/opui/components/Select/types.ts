import type { HTMLAttributes } from "vue";
export type Item = {
	text: string;
	value: string | number;
};

export type SelectProps = {
	[key: string]: any;
	class?: HTMLAttributes["class"];
	description?: string;
	disabled?: boolean;
	critical?: boolean;
	dense?: boolean;
	id?: string;
	items?: Item[];
	label?: string;
	name?: string;
	spread?: boolean;
	required?: boolean;
	size?: "small";
	endText?: string;
	value?: string | number;
	variant?: "outlined" | "filled";
};
