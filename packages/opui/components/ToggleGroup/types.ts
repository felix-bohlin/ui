import type { HTMLAttributes, InjectionKey } from "vue";

export type Props = {
	[key: string]: any;
	class?: HTMLAttributes["class"];
	name?: string;
	orientation?: "vertical";
	selection?: "single" | "multiple";
	size?: "default" | "small" | "x-small";
};

export type ToggleGroupContext = {
	name: string;
	type: "checkbox" | "radio";
};

export const ToggleGroupKey = Symbol() as InjectionKey<ToggleGroupContext>;
