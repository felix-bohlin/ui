import type { HTMLAttributes, InjectionKey } from "vue";

export type Props = {
	[key: string]: any;
	class?: HTMLAttributes["class"];
	name?: string;
};

export type TabsItemProps = {
	[key: string]: any;
	class?: HTMLAttributes["class"];
	name?: string;
	open?: boolean;
	panelId?: string;
	tabId?: string;
};

export type TabsTabProps = {
	[key: string]: any;
	class?: HTMLAttributes["class"];
	tabId?: string;
};

export type TabsPanelProps = {
	[key: string]: any;
	class?: HTMLAttributes["class"];
	panelId?: string;
	tabId?: string;
};

export const TabsGroupNameKey = Symbol() as InjectionKey<string>;
export const CurrentTabIdKey = Symbol() as InjectionKey<string>;
export const CurrentPanelIdKey = Symbol() as InjectionKey<string>;
