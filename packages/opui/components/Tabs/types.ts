export type Props = {
	[key: string]: any;
	name?: string;
};

export type TabsItemProps = {
	[key: string]: any;
	name?: string;
	open?: boolean;
	panelId?: string;
	tabId?: string;
};

export type TabsTabProps = {
	[key: string]: any;
	tabId?: string;
};

export type TabsPanelProps = {
	[key: string]: any;
	panelId?: string;
	tabId?: string;
};
